import usersModel from "../../models/users.model.js";

class UsersDaoMongoDb {
  constructor() {
    this.collection = usersModel;
  }

  async getAllUsers() {
    return await this.collection.find();
  }

  async getUserById(uid) {
    return await this.collection.findById(uid);
  }
  
  async findUser(query) {
    console.log(`query received in mongo ${query}`);
    return await this.collection.find(query)
  }
  
  async createNewUser(dataNewUser) {
    return await this.collection.create(dataNewUser);
  }

  async updateUser(uid, newData) {
    return await this.collection.findByIdAndUpdate(
      uid,
      { $set: newData },
      { new: true }
    );
  }

  async deleteUser(uid) {
    return await this.collection.findByIdAndDelete(uid)
  }
}

const usersDaoMongoDb = new UsersDaoMongoDb();
export default usersDaoMongoDb;
