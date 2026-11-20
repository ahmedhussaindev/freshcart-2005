import * as z from "zod"

export const checkOutSchema = z.object({
    city: z.string().nonempty('City is required'),
    phone: z.string().nonempty('Phone is required'),
    details: z.string().nonempty('Details is required')
})