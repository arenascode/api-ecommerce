import Product from "../entities/Product.js"
import productsRepository from "../repositories/products.repository.js"


class ProductsService {

  async getAllProducts(querys, sortPrice, page) {

    const matchQuery = {}
    if (querys.title) {
      matchQuery.title = querys.title
    }
    if (querys.category) {
      matchQuery.category = querys.category
    }
    console.log(matchQuery);
    const sort = parseInt(sortPrice ? sortPrice : 1)
    
    const pageNum = parseInt(page ? page : 1)

    return await productsRepository.getAllProducts(matchQuery, sort, pageNum)
    
  }
  
  async getProductById(productId) {
    return await productsRepository.getProductById(productId)
  } 

  async createNewProduct(newProductData, userId) {
    const newProduct = new Product(newProductData)
    const productExist = await productsRepository.findProduct({ code: newProduct.code })
    
    if (!productExist.length == 0) {
      throw new Error('This product already exist')
    } else {
      return await productsRepository.createNewProduct(newProduct, userId)
    }
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