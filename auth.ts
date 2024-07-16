import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { options } from "@/lib/authOptions"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...options,
    session: {strategy: 'jwt'}
})