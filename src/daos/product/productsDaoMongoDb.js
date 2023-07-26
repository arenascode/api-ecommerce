import productsModel from "../../models/products.model.js";

class ProductsDaoMongoDB {

  constructor() {
    this.collection = productsModel
  }

  async getAllProducts() {
    return this.collection.find()
  }

  async createNewProduct(newProductData, userId) {

    return this.collection.create(newProductData)
  }
}

const productsDaoMongoDb = new ProductsDaoMongoDB()
export default productsDaoMongoDb