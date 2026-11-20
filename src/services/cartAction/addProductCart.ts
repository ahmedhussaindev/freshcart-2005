"use server"
import { getMyToken } from "@/lib/getMyToken";

export async function addProductCart(productId: string, count: number = 1) {

    const token = await getMyToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
        method: 'POST',
        headers: {
            token: String(token),
            "content-type": "application/json"
        },
        body: JSON.stringify({
            productId: productId,
            count
        })
    })

    const payload = await response.json()

    return payload
}