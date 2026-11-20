"use server"
import { getMyToken } from "@/lib/getMyToken"
import { getServerSession } from "next-auth"
import { authOption } from "@/lib/authOptions"

export async function getUserOrders() {

    const session = await getServerSession(authOption)
    const userId = session?.user.id
    const token = await getMyToken()

    if (!userId || !token) {
        return { status: "fail", message: "Unauthorized" }
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,{
            headers: {
                token: String(token)
            },
            cache: "no-store"
        }
    )

    const payload = await response.json()

    return payload
}