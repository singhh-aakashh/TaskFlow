import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:"openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.modify",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore

      return session;
    },
    async signIn({user}){
      console.log(user.email)
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where:{email:user.email}
        });

      

        if(!existingUser){
         const newUser = await prisma.user.create({
            data:{
              email:user.email
            }
          })
         
        }
       
      }
      return true;
    }
  },
})