///////////////////////////////////////
// WITH ALOTOF HELP FORM AI SORRY 😔//
//////////////////////////////////////
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/toast"
import { forgotPassword, verifyResetCode, resetPassword } from "@/services/authPassword.service"

export default function ForgotPassword() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: { email: "", resetCode: "", newPassword: "", confirmPassword: "" },
        mode: "onBlur"
    })

    async function handleForgotPassword(values: any) {
        try {
            setLoading(true)
            let response

            if (step === 1) {
                response = await forgotPassword(values.email)
            } else if (step === 2) {
                response = await verifyResetCode(values.resetCode)
            } else {
                if (values.newPassword !== values.confirmPassword) {
                    toast.add({ title: "Error", description: "Passwords do not match" })
                    return
                }
                response = await resetPassword(values.email, values.newPassword)
            }

            if (response.statusMsg?.toLowerCase() === "success" || response.status?.toLowerCase() === "success" || response.token) {
                toast.add({ title: "Success", description: response.message || "Password reset successfully" })
                if (step === 3) {
                    router.push("/Login")
                } else {
                    setStep(step + 1)
                }
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
        <div className="mx-auto my-16 w-[90%] max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">Forgot Password</h1>
            <p className="mb-8 text-sm text-gray-500">{step === 1 ? "Enter your email" : step === 2 ? "Enter the reset code" : "Enter your new password"}</p>

            <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
                {step === 1 && <input type="email" placeholder="Email Address" {...register("email", { required: true })} className="w-full rounded-lg border border-gray-300 p-3" />}
                {step === 2 && <input type="text" placeholder="Reset Code" {...register("resetCode", { required: true })} className="w-full rounded-lg border border-gray-300 p-3" />}
                {step === 3 && (
                    <>
                        <input type="password" placeholder="New Password" {...register("newPassword", { required: true, minLength: 6 })} className="w-full rounded-lg border border-gray-300 p-3" />
                        <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true, minLength: 6 })} className="w-full rounded-lg border border-gray-300 p-3" />
                    </>
                )}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white disabled:opacity-50">
                    {loading ? "Please wait..." : step === 1 ? "Send Reset Code" : step === 2 ? "Verify Code" : "Reset Password"}
                </button>
            </form>
        </div>
    )
}