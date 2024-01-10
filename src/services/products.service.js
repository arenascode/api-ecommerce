import Product from "../entities/Product.js";
import { validationError } from "../models/error/errors.js";
import productsRepository from "../repositories/products.repository.js";
import userRepository from "../repositories/users.repository.js";
import { logger } from "../utils/logger.js";

class ProductsService {
  async getAllProducts(querys, sortPrice, page) {
    const matchQuery = {};
    if (querys.title) {
      matchQuery.title = querys.title;
    }

    if (querys.category) {
      matchQuery.category = querys.category;
    }
    console.log(matchQuery);
    const sort = parseInt(sortPrice ? sortPrice : 1);

    const pageNum = parseInt(page ? page : 1);

    return await productsRepository.getAllProducts(matchQuery, sort, pageNum);
  }

  async getProductById(productId) {
    return await productsRepository.getProductById(productId);
  }
  async findProduct(query) {
    return await productsRepository.findProduct(query)
  }
  async createNewProduct(newProductData, userData) {
    const productExist = await productsRepository.findProduct({
      code: newProductData.code,
    });

    if (!productExist.length == 0) {
      throw new validationError(
        "This Product Already exist",
        "createNewProduct",
        "ProductService"
      );
    } else {
      const user = await userRepository.getUserById(userData._id);
      const productWithOwner = { ...newProductData, owner: user.email };
      const newProduct = new Product(productWithOwner);
      return await productsRepository.createNewProduct(newProduct);
    }
  }

  async updateProduct(productId, newData) {
    console.log(newData);
    return await productsRepository.updateProduct(productId, newData); //newData must be an object
  }

  async deleteProduct(productId) {
    return await productsRepository.deleteProduct(productId);
  }
  async deleteAllProducts() {
    return await productsRepository.deleteAllProducts();
  }
}

const productsService = new ProductsService();

export default productsService;
