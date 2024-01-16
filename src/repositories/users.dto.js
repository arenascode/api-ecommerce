
function userHasCart(userData) {
    if (userData.cart._id) {
      return userData.cart._id
    } else {
      return ''
    }
  }export default class UserDto {
  
  constructor(userData) {
    this.fullName = `${userData.first_name} ${userData.last_name}`
    this.email = userData.email
    this.role = userData.role
    this.id = userData._id
    this.documents = userData.documents
    this.profilePhoto = userData.profilePhoto
    this.cartId = userHasCart(userData)
  }

  
}