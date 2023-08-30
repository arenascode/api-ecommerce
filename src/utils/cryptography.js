import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env.config.js';
import { BCRYPT_SALT, JWT_SECRET_KEY } from '../config/auth.config.js';
const bcryptSalt = BCRYPT_SALT
console.log(`bcryptSalt ${typeof bcryptSalt}`);

export function hash(password) {
  console.log(`hash ${password}`);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(BCRYPT_SALT))
}

export function isValidPassword(receivedPass, savedPass) {
  return bcrypt.compareSync(receivedPass, savedPass)
}

// Generate a token 

const secretKey = JWT_SECRET_KEY

export function generateAToken(payload) {
  const token = jwt.sign(JSON.parse(JSON.stringify(payload)), secretKey, {
    expiresIn: "24h",
  });
  return token
}
export function generateATokenToRestorePass(payload) {
  const token = jwt.sign(JSON.parse(JSON.stringify(payload)), secretKey, {
    expiresIn: "24h",
  });
  return token
}

export function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decodedUser) => {
      if (err) {
        reject(err)
      } else {
        resolve(decodedUser)
      }
    })
  })
}