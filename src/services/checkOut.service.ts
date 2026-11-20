"use server"
import { getMyToken } from "@/lib/getMyToken";

type shippingType = {
    phone: string,
    details: string,
    city: string
}

export async function CheckOutPayment(cartId: string, formData: shippingType) {

    const token = await getMyToken()

    const response = await fetch(`${process.env.BASE_URL}/orders/checkout-session/${cartId}?url=${process.env.DOMAIN}`, {
        method: 'POST',
        headers: {
            token: String(token),
            "content-type": "application/json"
        },
        body: JSON.stringify({
            shippingAddress: formData
        })
    })

    const payload = await response.json()

    return payload
}

export async function CheckOutCash(cartId: string, formData: shippingType) {

    const token = await getMyToken()

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
            method: "POST",
            headers: {
                token: String(token),
                "content-type": "application/json"
            },
            body: JSON.stringify({
                shippingAddress: formData
            })
        }
    )

    const payload = await response.json()

    return payload
}