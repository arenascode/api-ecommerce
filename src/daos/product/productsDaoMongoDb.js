import { log } from "console";
import productsModel from "../../models/products.model.js";
import { readFile } from "fs/promises";
// const { default: productsSecondEcommerce } = await import("./ecommerce2.products.json", {
//   assert: {
//     type: "json",
//   },
// });

export function toPojo(object) {
  return JSON.parse(JSON.stringify(object))
}


class ProductsDaoMongoDB {

  constructor() {
    this.collection = productsModel
  }

  async getAllProducts(matchQuerys, sort, pageNum) {
    console.log(matchQuerys);
    const paginateOptions = { limit: 6, page: 1, sort: {price: sort}, page: pageNum, lean: true };

      return await this.collection.paginate(matchQuerys, paginateOptions)
  }

  async getProductById(pid) {
    return await this.collection.findById(pid)

  }
  async findProduct(query) {
    return await this.collection.find(query)
  }
  async createNewProduct(newProductData) {
    // const pojo = toPojo(await this.collection.create(newProductData))
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

  async insertMany(arrayOfProducts) {
    try {
      const result = await this.collection.insertMany(arrayOfProducts);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}


// console.log(productsSecondEcommerce);
const productsDaoMongoDb = new ProductsDaoMongoDB()

// async function fillDataBase() {
//   try {
//     const data = await readFile("./src/daos/product/ecommerce2.products.json", 'utf-8')
//     const products = JSON.parse(data)
//     productsDaoMongoDb.insertMany(products)
//     console.log(products)
//   } catch (error) {
//     console.error(`error reading or parsing the file`, error.message)
//   }
// }

// fillDataBase()

// productsDaoMongoDb.deleteAllProducts()

export default productsDaoMongoDb