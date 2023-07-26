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

  async createNewCart(newCartData, userId) {
    return await this.dao.createNewCart(newCartData, userId);
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

const cartsRepository = new CartsRepository(); // insert DAO

export default cartsRepository;
