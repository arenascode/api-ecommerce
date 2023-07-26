import cartsRepository from "../repositories/carts.repository.js";

class CartsService {

  async getAllCarts() {
    //Develop Logic relative to Mongoose pagination
    return await cartsRepository.getAllCarts();
  }

  async getCartById(cartId) {
    return await cartsRepository.getCartById(cartId);
  }

  async createNewCart (dataNewCart, userId) {
    return await cartsRepository.createNewCart(dataNewCart, userId);
  }

  async addProductToCart(pid, cid) {
    return cartsRepository.addProductToCart(pid, cid)
  }

  async updateCart(cartId, newData) {
    return await cartsRepository.updateCart(cartId, newData); //newData must be an object
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