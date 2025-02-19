import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginService, UsersService, client } from "./client"
import { z } from 'zod';
import { headers } from "next/headers";

const baseUrl = process.env.API_URL || "";
client.setConfig({
  baseUrl,
  // TODO set token when we have it
})



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if(parsedCredentials.success){
          const {email, password} = parsedCredentials.data;
          const {data,response} = await LoginService.loginAccessToken({
            body:{ username: email, password}
          })


          if(response.ok){

            client.setConfig({
              baseUrl,
              headers:({
                'Authorization':data && `Bearer ${data.access_token}`,
              })
            })

            const {data:meData, response:meResponse} = await UsersService.readUserMe()
            if(meResponse.ok){
              return {
                email: meData?.email,
                name: meData?.full_name,
              }
            }

            return {};
          }
        }



        return null;
      },
    }),
  ],
})
