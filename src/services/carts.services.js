import Cart from "../entities/Cart.js";
import cartsRepository from "../repositories/carts.repository.js";
import usersRepository from "../repositories/users.repository.js";

class CartsService {

  async getAllCarts() {
    //Develop Logic relative to Mongoose pagination
    return await cartsRepository.getAllCarts();
  }

  async getCartById(cartId) {
    return await cartsRepository.getCartById(cartId);
  }

  async createNewCart(dataNewCart, userId) {
    console.log(`dataNewCart ${JSON.stringify(dataNewCart)}`);
    const newProductToCart = {
      _id: dataNewCart.pid,
      quantity: dataNewCart.quantity,
    };
    const userExist = await usersRepository.getUserById(userId)
    console.log(`userExist ${userExist}`);
    if (userExist.cart) {
      console.log(`user has a cart`);
      const productInCartExist = await cartsRepository.findProductInCart(userExist.cart, dataNewCart.pid)
      if (productInCartExist) {
        console.log(`productInCartExist`);
        const productToUpdate = productInCartExist.products.find(p => p._id === dataNewCart.pid);
        console.log(`productToUpdate ${productToUpdate}`);
        productToUpdate.quantity += dataNewCart.quantity
        productInCartExist.save()
        return productInCartExist
      } else {
        const cartToUpdate = await cartsRepository.getCartById(userExist.cart)
        console.log(`cartToUpdate.products ${cartToUpdate}`);
        cartToUpdate.products.push(newProductToCart)
        cartToUpdate.save()
        return cartToUpdate
      }
    } else {
      const newCart = new Cart(userExist._id)
      newCart.products.push(newProductToCart)
      const cartCreated = await cartsRepository.createNewCart(newCart);
      await usersRepository.updateUser(userExist._id, { cart: cartCreated._id })
      return cartCreated
    }
  }

  async addProductToCart(pid, cid) {
    return cartsRepository.addProductToCart(pid, cid)
  }

  async updateCart(cartId, newData) {

    return await cartsRepository.updateCart(cartId, {products: newData}); //newData must be an object
  }

  async deleteCart(cartId) {
    return await cartsRepository.deleteCart(cartId);
  }

  async deleteAllCarts() {
    return await cartsRepository.deleteAllCarts();
  }
}

const cartsService = new CartsService();

export default cartsService;