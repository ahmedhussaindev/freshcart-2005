"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { loginSchema } from "@/schema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

export default function Login() {

  const router = useRouter()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  async function handleLogin(values: any) {

    const response = await signIn('credentials', { ...values, redirect: false })

    if (response?.ok) {
      router.push('/')
      toast.add({
        title: "Success",
        description: "You Logedin successfuly"
      })
    } else {
      toast.add({
        title: "Error",
        description: "couldnot Login to this system"
      })
    }
  }

  return (
    <div className="w-[90%] md:w-[60%] mx-auto rounded-md p-5 md:p-10 shadow-xl my-10 border">
      <h1 className="text-green-700 text-center text-4xl font-semibold mb-4">Login Now</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

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

        <div className="text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-3 h-12 w-full rounded-xl bg-green-600 text-base font-semibold transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:scale-101 hover:-translate-y-0.5">
          Login Now
        </Button>
      </form>
    </div>
  )
}