import cartsModel from "../../models/carts.model.js"

class CartsDaoMongoDb {

  constructor(daoSelected) {
    this.collection = daoSelected
  }

  async createNewCart(newCartData) {
    return await this.collection.create(newCartData)
  }

}

const cartsDaoMongoDb = new CartsDaoMongoDb(cartsModel)

export default cartsDaoMongoDb