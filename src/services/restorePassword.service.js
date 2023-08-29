import usersRepository from "../repositories/users.repository.js";
import { generateATokenToRestorePass } from "../utils/cryptography.js";
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

  async finishRecovery() {

  }
}

export const restorePassService = new RestorePasswordService()