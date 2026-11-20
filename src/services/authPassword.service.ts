"use server"
import { getMyToken } from "@/lib/getMyToken"
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth"

export async function forgotPassword(email: string) {
    const response = await fetch(`${BASE_URL}/forgotPasswords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })

    return await response.json()
}

export async function verifyResetCode(resetCode: string) {
    const response = await fetch(`${BASE_URL}/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            resetCode
        })
    })

    return await response.json()
}

export async function resetPassword(email: string, newPassword: string) {
    const response = await fetch(`${BASE_URL}/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            newPassword
        })
    })

    return await response.json()
}

export async function changePassword(
    currentPassword: string,
    password: string,
    rePassword: string
) {
    const token = await getMyToken()

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
        method: "PUT",
        headers: {
            token: String(token),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword,
            password,
            rePassword
        })
    })

    return await response.json()
}