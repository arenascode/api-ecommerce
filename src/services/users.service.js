import User from "../entities/User.js"
import usersRepository from "../repositories/users.repository.js"

class UsersService {

  async getAllUsers() {
    return await usersRepository.getAllUsers()
  }

  async getUserById(uid) {
    //logic
    return await usersRepository.getUserById(uid)
  }

  async createNewUser(dataNewUser) {
    console.log(dataNewUser);
    const newUser = new User(dataNewUser)
    console.log(newUser.email);
    const userExist = await usersRepository.findUser({ email: newUser.email })
    if (!userExist.length == 0) {
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
}

const usersService = new UsersService()
export default usersService