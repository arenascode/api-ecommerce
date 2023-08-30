import { validationError } from "../models/errors.js";
import usersRepository from "../repositories/users.repository.js";
import { decodeToken, generateATokenToRestorePass, hash, isValidPassword } from "../utils/cryptography.js";
import { logger } from "../utils/logger.js";
import mailService from "./mail.service.js";

class RestorePasswordService {

  async initializeRecovery(email) {
    try {
      const user = await usersRepository.findUser(email)
      console.log(user)
      if (!user) {
        throw new ErrorNotFound('User Not Found', 'restoreUserPassword')
        // const error = new ErrorNotFound('User Not Found', 'RestoreUserPasword')
        // error.logError()
      }
      const token = generateATokenToRestorePass(user)
      await mailService.sendMailToRestorePassword(user.email, user._id, token);
      return user
    } catch (error) {
      throw error
    }
  }

  async finishRecovery(userData) {
    logger.debug(`data in ResPassService ${JSON.stringify(userData)}`)
    const tokenExist = decodeToken(userData.userToken)
    if (!tokenExist) throw new validationError('The time to restore your password expired. Please send ud your email again')

    const user = await usersRepository.getUserById(userData.userId)
    logger.debug(`user ${JSON.stringify(user)}`)
    
    const isTheSamePass = isValidPassword(userData.newPass, user.password)
    logger.error(JSON.stringify(isTheSamePass))

    if (isTheSamePass) {
      throw new validationError(
        `Please put a different password to the one you had`
      );
    } 

    const newpassHashed = hash(userData.newPass)
    console.log(newpassHashed);
    user.password = newpassHashed
    user.save()
    return user
  }
}

export const restorePassService = new RestorePasswordService()