"use server"
import { getMyToken } from "@/lib/getMyToken";

export async function deleteProduct(productId:string){

    const token = await getMyToken()

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        method:'DELETE',
        headers:{
            token: String(token),
            "content-type":"application/json"
        }  
    })

    const payload = await response.json()

    return payload
}