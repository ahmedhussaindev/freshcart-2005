"use server"

export async function RegisterForm(payload: any) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "content-type": "application/json"
        }
    })
    return response.ok
}