import usersRepository from "../repositories/users.repository.js"

class UsersService {

  async getAllUsers() {
    //Logic
    
    return await usersRepository.getAllUsers()
  }

  async getUserById(uid) {
    //logic
    return await usersRepository.getUserById(uid)
  }

  async createNewUser(dataNewUser) {
    // Logic
    return await usersRepository.createNewUser(dataNewUser)
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