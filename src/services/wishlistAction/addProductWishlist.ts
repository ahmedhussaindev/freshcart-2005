"use server"
import { getMyToken } from "@/lib/getMyToken"

export async function addProductWishlist(productId: string) {
    
    const token = await getMyToken()

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
            token: String(token),
            "content-type": "application/json"
        },
        body: JSON.stringify({ productId })
    })
    const data = await response.json()
    return data
}