import { envConfig } from "./env.config.js";
export const githubClientId = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const githubCallbackUrl =
  "http://localhost:8080/api/sessions/githubcallback";

// JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//bcryptSalt
export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT)
// Nodemailer 
export const nodeMailerUSer = process.env.NODEMAILER_USER
export const nodeMailerPass = process.env.NODEMAILER_PASS

