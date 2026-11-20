"use server"
import { getMyToken } from "@/lib/getMyToken"

export async function removeProductWishlist(productId: string) {
    
    const token = await getMyToken()

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token: String(token)
        }
    })

    const data = await response.json()
    return data
}