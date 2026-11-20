"use server"
import { getMyToken } from "@/lib/getMyToken"

export async function getWishlist() {
    
    const token = await getMyToken()

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: String(token)
        },
        cache: "no-store"
    }
    )
    const data = await response.json()
    return data
}