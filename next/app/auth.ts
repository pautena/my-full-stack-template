import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginService, OpenAPI } from "./client"

//TODO move this to the correct file
OpenAPI.BASE = process.env.API_URL || ""
OpenAPI.TOKEN = async () => {
  return ""
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username,password }) {
        const response = await LoginService.loginAccessToken({
          formData: {
            username: username as string,
            password: password as string
          }
        })

        return null;
      },
    }),
  ],
})
