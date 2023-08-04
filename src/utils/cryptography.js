import bcrypt from 'bcrypt'

const bcryptSalt = process.env.BCRYPT_SALT || 10

export function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptSalt))
}

export function isValidPassword(receivedPass, savedPass) {
  return bcrypt.compare(receivedPass, savedPass)
}

