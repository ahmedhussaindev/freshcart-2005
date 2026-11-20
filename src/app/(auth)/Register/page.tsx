"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { registerSchema } from "@/schema/registerSchema"
import { RegisterForm } from "@/services/register.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

export default function Register() {

  const router = useRouter()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    mode: 'onBlur'
  })

  async function handleRegister(values: any) {
    const response = await RegisterForm(values)
    if (response) {
      router.push('/Login')
      toast.add({
        title: "Success",
        description:"You Signup successfuly"
      })
    } else {
      toast.add({
        title: "Error",
        description:"couldnot Signup to this system"
      })
    }
  }

  return (
    <div className="w-[90%] md:w-[60%] mx-auto rounded-md p-5 md:p-10 shadow-xl my-10 border">
      <h1 className="text-green-700 text-center text-4xl font-semibold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">

        {/* Name Controller */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel htmlFor={field.name} className="font-semibold">
                Full Name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl px-4"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Email Controller */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel htmlFor={field.name} className="font-semibold">
                Email Address
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl px-4"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Password Controller */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel htmlFor={field.name} className="font-semibold">
                Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl px-4"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Confirm Password Controller */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel htmlFor={field.name} className="font-semibold">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl px-4"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Phone Controller */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel htmlFor={field.name} className="font-semibold">
                Phone Number
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="tel"
                placeholder="010 0000 0000"
                autoComplete="tel"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl px-4"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-3 h-12 w-full rounded-xl bg-green-600 text-base font-semibold transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:scale-101 hover:-translate-y-0.5">
          SignUp Now
        </Button>
      </form>
    </div>
  )
}