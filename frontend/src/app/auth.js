import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import * as b from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
    Github,
  ],
})