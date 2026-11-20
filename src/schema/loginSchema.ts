import * as z from "zod"

export const loginSchema = z.object({
    email: z.email('invalid email format'),
    password: z.string().regex(/^.{3,}$/),
})