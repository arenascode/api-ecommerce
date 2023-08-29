import dotenv from "dotenv"

export const envConfig = dotenv.config({
  path: process.env.NODE_ENV === 'prod' ? './.env.prod' : './.env.dev'
})


export const NODE_ENV = process.env.NODE_ENV || 'dev'



