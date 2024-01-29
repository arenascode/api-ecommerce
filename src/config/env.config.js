import dotenv from "dotenv";

export const envConfig = dotenv.config({
  path: process.env.NODE_ENV === 'prod' ? './.env.prod' : './.env.dev'
})

export const NODE_ENV = process.env.NODE_ENV || 'dev'

export const CLIENT_URL = process.env.CLIENT_URL


export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY



