import { AuthOptions, getServerSession } from "next-auth"
import db from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"

const getProviderOptions = () => {
  const { 
    GOOGLE_CLIENT_ID: clientId, 
    GOOGLE_CLIENT_SECRET: clientSecret 
  } = process.env

  if (!clientId || clientId.length === 0)
    throw new Error("Missing GOOGLE_CLIENT_ID")
  if (!clientSecret || clientSecret.length === 0)
    throw new Error("Missing GOOGLE_CLIENT_SECRET")

  return {
    clientId,
    clientSecret
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    GoogleProvider(getProviderOptions())
  ],
  callbacks: {
    session({ session, token }) {
      if (token)
        return {
          ...session,
          accessToken: token.accessToken,
          user: { 
            ...session.user, 
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.picture
          }
        }

      return session
    },
    async jwt({ token, user, account }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!dbUser) {
        token.id = user!.id
        if (account)
          token.accessToken = account.access_token
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    redirect() {
      return "/dashboard"
    }
  }
}

export const getSession = async () =>
  await getServerSession(authOptions)