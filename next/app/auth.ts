import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginService, client } from "./client"

client.setConfig({
  baseUrl: process.env.API_URL || "",
  // TODO set token when we have it
})



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username,password }) {
        const response = await LoginService.loginAccessToken({
          body:{
            username: username as string,
            password: password as string
          }
        })

        return null;
      },
    }),
  ],
})
