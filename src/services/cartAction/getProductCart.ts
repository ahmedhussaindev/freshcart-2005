"use server"
import { getMyToken } from "@/lib/getMyToken";

export async function getCartProduct(){

    const token = await getMyToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart',{
        headers:{
            token: String(token)
        }
    })

    const payload = await response.json()

    return payload
}