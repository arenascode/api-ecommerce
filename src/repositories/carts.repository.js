import cartsDaoMongoDb from "../daos/cart/cartsDaoMongoDb.js";

class CartsRepository {
  constructor(daoSelected) {
    this.dao = daoSelected;
  }

  async getAllCarts() {
    return await this.dao.getAllCarts();
  }

  async getCartById(cartId) {
    return await this.dao.getCartById(cartId);
  }

  async findProductInCart(cid, pid) {
    return await this.dao.findProductInCart(cid, pid)
  }
  async createNewCart(newCartData) {
    return await this.dao.createNewCart(newCartData);
  }

  async addProductToCart(pid,cid) {
    return await this.dao.createNewCart(pid, cid);
  }

  async updateCart(cid, newData) {
    // the new data must be an object
    return await this.dao.updateCart(cid, newData);
  }

  async deleteCart(cid) {
    return await this.dao.deleteCart(cid);
  }

  async deleteAllCarts() {
    return await this.dao.deleteAllCarts();
  }
}

const cartsRepository = new CartsRepository(cartsDaoMongoDb); // insert DAO

export default cartsRepository;
