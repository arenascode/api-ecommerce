export default class UserDto {
  
  constructor(userData) {
    this.fullName = `${userData.first_name} ${userData.last_name}`
    this.email = userData.email
    this.role = userData.role
  }
}