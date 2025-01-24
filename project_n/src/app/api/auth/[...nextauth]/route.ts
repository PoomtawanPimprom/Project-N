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
          const store = await prisma.store.findFirst({
            where:{userId:user.id}
          })
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            roleId: user.roleId.toString(),
            storeId: store ? store.id.toString() : ""
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
    maxAge:60 *60* 5 
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user?: any }) => {
      if (user) {
        token.id = user.id
        token.roleId = user.roleId
        token.storeId = user.storeId
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.id = token.id
        session.user.roleId = token.roleId
        session.user.storeId = token.storeId
        delete session.user.image
      }
      
      return session
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }