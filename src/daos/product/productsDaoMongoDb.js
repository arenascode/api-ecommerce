import productsModel from "../../models/products.model.js";

class ProductsDaoMongoDB {

  constructor() {
    this.collection = productsModel
  }

  async getAllProducts() {
    return await this.collection.find()
  }

  async getProductById(pid) {
    return await this.collection.findById(pid)

  }
  async createNewProduct(newProductData, userId) {

    return await this.collection.create(newProductData)
  }

  async updateProduct(pid, newData) {
    try {
      return await this.collection.findByIdAndUpdate(pid, { $set: newData }, { new: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProduct(pid) {
    try {
      return await this.collection.findByIdAndDelete(pid)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteAllProducts() {
    try {
      return await this.collection.deleteMany()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const productsDaoMongoDb = new ProductsDaoMongoDB()
export default productsDaoMongoDb