"use server"
import { getMyToken } from "@/lib/getMyToken";

export async function clearCart(){

    const token = await getMyToken()

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'DELETE',
        headers:{
            token: String(token),
            "content-type":"application/json"
        }  
    })

    const payload = await response.json()

    return payload
}