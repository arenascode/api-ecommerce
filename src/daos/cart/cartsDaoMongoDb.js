import cartsModel from "../../models/carts.model.js"

class CartsDaoMongoDb {

  constructor(daoSelected) {
    this.collection = daoSelected
  }
  async getAllCarts() {
    return await this.collection.find()
  }

  async getCartById(cid) {
    return await this.collection.findById(cid)
  }
  
  async findProductInCart(cid, pid) {
    // console.log(`pid mongo ${pid}`);
    const productInCart = await this.collection.findOne({
      _id: cid,
      products: {
        $elemMatch: {
          _id: pid,
        },
      },
    });
    // console.log(`MGO PIC${JSON.stringify(productInCart)}`)
    return productInCart
  }
  
  async createNewCart(newCartData) {
    return await this.collection.create(newCartData)
  }
  async addProductToCart(pid, cid) {
    //logic 
  }
  async updateCart(cid, newData) {
    return await this.collection.findByIdAndUpdate(cid, { $set: newData }, {new: true})
  }
  async deleteCart(cid) {
    return await this.collection.findByIdAndDelete(cid)
  }

  async deleteAllCarts() {
    return await this.collection.deleteMany()
  }

}

const cartsDaoMongoDb = new CartsDaoMongoDb(cartsModel)

export default cartsDaoMongoDb