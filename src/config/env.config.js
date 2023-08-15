import dotenv from "dotenv"

export const envConfig = dotenv.config({
  path: process.env.NODE_ENV === 'prod' ? './.env.prod' : './.env.dev'
})




