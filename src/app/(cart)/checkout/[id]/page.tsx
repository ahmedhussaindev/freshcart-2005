"use client"
import { CheckOutCash, CheckOutPayment } from "@/services/checkOut.service"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { checkOutSchema } from "@/schema/checkOutSchema"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { cartContext } from "@/context/cartNumber.context"

export default function CheckOut() {

    const router = useRouter()

    const { id } = useParams<{ id: string }>()

    const [paymentMethod, setPaymentMethod] = useState("online")
    const { setCartNumber } = useContext(cartContext)

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(checkOutSchema),
        defaultValues: {
            details: '',
            phone: '',
            city: ''
        },
        mode: 'onBlur'
    })

    async function handlePayment(values: any) {

        try {
            if (paymentMethod === "online") {
                const response = await CheckOutPayment(id, values)

                if (response.status === "success") {
                    window.location.href = response.session.url
                } else {
                    toast.add({
                        title: "Error",
                        description: response.message
                    })
                }
            } else {
                const response = await CheckOutCash(id, values)
                setCartNumber(0)
                router.push("/allorders")

                if (response.status === "success") {
                    toast.add({
                        title: "Success",
                        description: response.message || "Order placed successfully"
                    })
                } else {
                    toast.add({
                        title: "Error",
                        description: response.message
                    })
                }
            }

        } catch (err) {
            toast.add({
                title: "Error",
                description: "There is an error processing your order"
            })
        }
    }

    return (
        <div className="w-[90%] md:w-[60%] mx-auto rounded-md p-5 md:p-10 shadow-xl my-10 border">
            <h1 className="text-green-700 text-center text-4xl font-semibold mb-4">Pay Now</h1>

            <form onSubmit={handleSubmit(handlePayment)} className="space-y-5">

                {/* city Controller */}
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name} className="font-semibold">City</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
                                placeholder="Enter Your City"
                                autoComplete="off"
                                className="h-12 rounded-xl px-4"
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />

                {/* address Controller */}
                <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name} className="font-semibold">Details</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
                                placeholder="Enter Your Address"
                                autoComplete="off"
                                className="h-12 rounded-xl px-4"
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />

                {/* phone Controller */}
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name} className="font-semibold">Phone</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="tel"
                                placeholder="Enter Your Phone"
                                autoComplete="off"
                                className="h-12 rounded-xl px-4"
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />
                {/* Payment Method */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700">Payment Method</h3>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                        <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="accent-green-600" />
                        <span>Online Payment</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                        <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="accent-green-600" />
                        <span>Cash on Delivery</span>
                    </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-3 h-12 w-full rounded-xl bg-green-600 text-base font-semibold transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:scale-101 hover:-translate-y-0.5">
                    {paymentMethod === "online" ? "Pay Now" : "Confirm Order"}
                </Button>
            </form>
        </div>
    )
}