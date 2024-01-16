import User from "../entities/User.js";
import { ErrorNotFound } from "../models/error/errors.js";
import usersRepository from "../repositories/users.repository.js";
import { hash } from "../utils/cryptography.js";
import { logger } from "../utils/logger.js";

class UsersService {
  async getAllUsers() {
    return await usersRepository.getAllUsers();
  }

  async getUserById(uid) {
    //logic
    return await usersRepository.getUserById(uid);
  }

  async findUserByCriteria(criteria) {
    try {
      return await usersRepository.findUser(criteria);
    } catch (error) {
      throw ErrorNotFound('user Not Found')
    }
  }

  async createNewUser(dataNewUser) {
    try {
      console.log(`dataNewUser in Service ${dataNewUser}`);
      const newUser = new User(dataNewUser);
      console.log(newUser.email);
      if (!newUser) {
        throw new Error("Some error Ocurred. Review data");
      }
      const userExist = await usersRepository.findUser({ email: newUser.email });
      if (userExist) {
        throw new Error("The User Already Exist");
      } else {
        return await usersRepository.createNewUser(newUser);
      }
    } catch (error) {
      return error
    }
  }

  async updateUser(uid, newData) {
    //logic
    if (newData.password) {
      const passEncrypted = hash(newData.password)
      delete newData.password
      const dataToUpdate = { ...newData, password: passEncrypted }
      console.log(dataToUpdate);
      return await usersRepository.updateUser(uid, dataToUpdate);
    } else {
      return await usersRepository.updateUser(uid, newData);
    }
  }

  async deleteUser(uid) {
    //logic
    return await usersRepository.deleteUser(uid);
  }
}

const usersService = new UsersService();
export default usersService;
