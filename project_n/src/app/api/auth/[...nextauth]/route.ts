import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions:NextAuthOptions  = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        //check user
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        })
        //compare
        if (user &&(await bcrypt.compare(credentials.password, user.password!))) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email
            
          }
        } else {
          throw new Error("Username หรือ password ไม่ถูกต้อง กรุณากรอกใหม่")
        }
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge:60 *5
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user?: { id: string } }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.id = token.id
        delete session.user.image
      }
      
      return session
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }