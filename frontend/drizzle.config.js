import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  dialect:'turso',
  dbCredentials:{
    url:process.env.DATABASE_URL,
    authToken:process.env.DATABASE_TOKEN,
  },
  out:'drizzle',
  schema:'drizzle/schema.js'
})