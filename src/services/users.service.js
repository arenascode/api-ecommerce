import User from "../entities/User.js"
import { ErrorNotFound } from "../models/errors.js"
import usersRepository from "../repositories/users.repository.js"

class UsersService {

  async getAllUsers() {
    return await usersRepository.getAllUsers()
  }

  async getUserById(uid) {
    //logic
    return await usersRepository.getUserById(uid)
  }

  async findUserByCriteria(criteria) {
    return await usersRepository.findUser(criteria)
  }

  async createNewUser(dataNewUser) {
    console.log(`dataNewUser in Service ${dataNewUser}`);
    const newUser = new User(dataNewUser)
    console.log(newUser.email);
    const userExist = await usersRepository.findUser({ email: newUser.email })
    if (userExist) {
      throw new Error('The User Already Exist')
    } else {
      return await usersRepository.createNewUser(newUser)
    }
  }

  async updateUser(uid, newData) {
    //logic
    return await usersRepository.updateUser(uid, newData)
  }

  async deleteUser(uid) {
    //logic 
    return await usersRepository.deleteUser(uid)
  }

  async restoreUserPassword(email) {
    try {
      const user = await usersRepository.findUser(email)
      console.log(user)
      if (!user) {
        const error = new ErrorNotFound('User Not Found', 'RestoreUserPasword')
        error.logError()
      }
      
      return user
    } catch (error) {
      return error
    }
  }
}

const usersService = new UsersService()
export default usersService