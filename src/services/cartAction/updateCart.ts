"use server"
import { getMyToken } from "@/lib/getMyToken";

export async function updateProductCart(productId: string, count: number) {

    const token = await getMyToken()

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: 'PUT',
        headers: {
            token: String(token),
            "content-type": "application/json"
        },
        body: JSON.stringify({
            count: count
        })
    })

    const payload = await response.json()

    return payload
}