import User from "../entities/User.js";

class SessionsService {

  async registerUser(dataNewUser) {
    console.log(dataNewUser);
    const newUser = new User(dataNewUser)
    return newUser
  }

  async userLogin(loginData) {

  }
}

const sessionsService = new SessionsService()
export default sessionsService