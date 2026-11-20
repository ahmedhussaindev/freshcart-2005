"use server"

import { cookies } from "next/headers"

export async function LoginForm(payload: any) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "content-type": "application/json"
        }
    })

    const data = await response.json()

    const cookie = await cookies()
    
    cookie.set("userToken",data.token,{
        httpOnly:true,
        maxAge:60*60*24*7,
        secure:true
    })

    return data
}