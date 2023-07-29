import productsRepository from "../repositories/products.repository.js"


class ProductsService {

  async getAllProducts() {
  //Develop Logic relative to Mongoose pagination
  return await productsRepository.getAllProducts()
  }
  
  async getProductById(productId) {
    return await productsRepository.getProductById(productId)
  } 

  async createNewProduct(newProductData, userId) {
    return await productsRepository.createNewProduct(newProductData, userId)
  }

  async updateProduct(productId, newData) {
    console.log(newData);
    return await productsRepository.updateProduct(productId, newData) //newData must be an object
  }

  async deleteProduct(productId) {
    return await productsRepository.deleteProduct(productId)
  }
  async deleteAllProducts() {
    return await productsRepository.deleteAllProducts()
  }
}

const productsService = new ProductsService()

export default productsService