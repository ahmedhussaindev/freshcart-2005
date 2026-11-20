import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {

    const decodedToken = (await cookies()).get('next-auth.session-token')?.value

    const token = await decode({
        token: decodedToken,
        secret: process.env.NEXTAUTH_SECRET as string
    })

    return token?.token
}