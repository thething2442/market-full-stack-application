// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/app/dbconfiguration/db"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Github,
  ],
})