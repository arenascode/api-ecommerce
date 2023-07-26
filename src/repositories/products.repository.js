import productsDaoMongoDb from "../daos/product/productsDaoMongoDb.js"

class ProductsRepository {

  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async getAllProducts() {
    return await this.dao.getAllProducts()
  }

  async getProductById(productId) {
    return await this.dao.getProductById(productId)
  }

  async createNewProduct(newProductData, userId) {
    return await this.dao.createNewProduct(newProductData, userId)
  }

  async updateProduct(productId, newData) {
    // the new data must be an object
    return await this.dao.updateProduct(productId, newData)
  }

  async deleteProduct(productId) {
    return await this.dao.deleteProduct(productId)
  }
  
  async deleteAllProducts() {
    return await this.dao.deleteAllProducts()
  }
}

const productsRepository = new ProductsRepository(productsDaoMongoDb) // insert DAO

export default productsRepository