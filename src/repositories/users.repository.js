import usersDaoMongoDb from "../daos/user/usersDaoMongoDb.js"
class UsersRepository {

  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async getAllUsers() {
    return await this.dao.getAllUsers()
  }

  async getUserById(uid) {
    return await this.dao.getUserById(uid)
  }

  async findUser(query) {
    return await this.dao.findUser(query)
  }

  async createNewUser(dataNewUser) {
    return this.dao.createNewUser(dataNewUser);
  }

  async updateUser(uid, newData) {
    return this.dao.updateUser(uid, newData);
  }

  async deleteUser(uid) {
    return this.dao.deleteUser(uid);
  }
}

const usersRepository = new UsersRepository(usersDaoMongoDb) // insert DAO
export default usersRepository
