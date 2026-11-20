"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema } from "@/schema/changePasswordSchema"
import { changePassword } from "@/services/authPassword.service"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ChangePassword() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { currentPassword: "", password: "", rePassword: "" },
        mode: "onBlur"
    })

    async function handleChangePassword(values: any) {
        try {
            setLoading(true)
            const response = await changePassword(values.currentPassword, values.password, values.rePassword)

            if (response.token) {
                toast.add({ title: "Success", description: "Password changed successfully" })
                router.push("/")
            } else {
                toast.add({ title: "Error", description: response.message })
            }
        } catch {
            toast.add({ title: "Error", description: "Something went wrong" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto my-16 w-[90%] max-w-md rounded-2xl border p-8 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold">Change Password</h1>

            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-5">
                {[
                    { name: "currentPassword", label: "Current Password" },
                    { name: "password", label: "New Password" },
                    { name: "rePassword", label: "Confirm New Password" }
                ].map((item) => (
                    <Controller key={item.name} name={item.name as "currentPassword" | "password" | "rePassword"} control={control} render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="font-semibold">{item.label}</label>
                            <input {...field} type="password" className="w-full rounded-lg border border-gray-300 p-3" />
                            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                        </div>
                    )} />
                ))}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white disabled:opacity-50">
                    {loading ? "Please wait..." : "Change Password"}
                </button>
            </form>
        </div>
    )
}