import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const bcryptSalt = process.env.BCRYPT_SALT || 10

export function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptSalt))
}

export function isValidPassword(receivedPass, savedPass) {
  return bcrypt.compare(receivedPass, savedPass)
}

// Generate a token 

const secretKey = 'JWT_SECRET_KEY'

export function generateAToken(payload) {
  const token = jwt.sign(JSON.parse(JSON.stringify(payload)), secretKey, {
    expiresIn: "24h",
  });
  console.log(`Generate a Token Fn ${token}`);
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