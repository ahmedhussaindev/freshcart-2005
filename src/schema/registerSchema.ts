import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty('Name is Required').min(3, "at least 3 character").max(10, "at most 10 charcter"),
    email: z.email('invalid email format'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'must be egyption number'),
    password: z.string().regex(/^.{3,}$/),
    rePassword: z.string().nonempty('confirm password is required')
}).refine((obj) => {
    return obj.password === obj.rePassword,
    {
        error: "password and rePassword must be matched",
        path: ["rePasswrod"]
    }
})