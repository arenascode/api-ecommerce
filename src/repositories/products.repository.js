import productsDaoMongoDb from "../daos/product/productsDaoMongoDb.js"

class ProductsRepository {

  constructor(daoSelected) {
    this.dao = daoSelected
  }

  async getAllProducts(queryFilter, sort, pageNum) {
    return await this.dao.getAllProducts(queryFilter, sort, pageNum)
  }

  async getProductById(pid) {
    return await this.dao.getProductById(pid)
  }
  
  async findProduct(query) {
    return await this.dao.findProduct(query)
  }
  async createNewProduct(newProductData, userId) {
    return await this.dao.createNewProduct(newProductData, userId)
  }

  async updateProduct(productId, newData) {
    return await this.dao.updateProduct(productId, newData)

  }

  async deleteProduct(pid) {
    return await this.dao.deleteProduct(pid)
  }
  
  async deleteAllProducts() {
    return await this.dao.deleteAllProducts()
  }
}

const productsRepository = new ProductsRepository(productsDaoMongoDb) // insert DAO

export default productsRepository