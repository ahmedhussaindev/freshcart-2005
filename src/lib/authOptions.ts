import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Login',
            credentials: {
                email: { label: 'Email', placeholder: 'Enter your Email', type: 'email' },
                password: { label: 'Password', placeholder: 'Enter your Password', type: 'password' }
            },
            async authorize(credentials) {
                const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        "content-type": "application/json"
                    }
                })

                if (!response.ok) {
                    return null
                }

                const data = await response.json()

                const userData = jwtDecode<{ id: string }>(data.token)

                return {
                    id: userData.id,
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token
                }
            }
        })
    ],
    pages: {
        signIn: '/Login'
    },
    callbacks: {
        jwt({ token, user }) {

            if (user) {
                token.token = user.token
                token.id = user.id
            }

            return token
        },
        session({ token, session }) {

            if (token) {
                session.user.id = token.id as string
            }

            return session
        }
    }
}