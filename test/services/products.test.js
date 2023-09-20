import { Mongoose } from "mongoose";
import productsService from "../../src/services/products.service.js";
import Assert from "node:assert";
import { describe, it } from "mocha";
import mongoose from "mongoose";
import assert from "node:assert";
import { logger } from "../../src/utils/logger.js";
import productsDaoMongoDb from "../../src/daos/product/productsDaoMongoDb.js";
import { productMock, userData } from "../mocks.js";

const mongoUrlString = "mongodb://localhost/test-ecommerce";

function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

// describe("productsService", async () => {

//   beforeEach(async () => {
//     await mongoose.connect(mongoUrlString);
//   });
//   // afterEach(async () => {
//   // await mongoose.disconnect();
//   // })

//   // ** ADD New Product
//   it("add new product", async () => {
//     beforeEach(async () => {

//       try {
//         await mongoose.connection.collection("products").deleteMany();
//       } catch (error) {
//         console.log(`can't delete documents1 ${error.message}`);
//       }
//     });

//     after(async () => {
//       try {
//         await mongoose.connection.collection("products").drop();
//       } catch (error) {
//         console.log(`can't delete documents2 ${error.message}`);
//       }
//     });

//     const newProduct = await productsService.createNewProduct(
//       productMock,
//       userData
//     );
//     const productCreated = toPojo(newProduct)
//     delete productCreated._id

//     assert.deepStrictEqual(productCreated, productMock);
//   });

//   // ** Find Product by ID
//   it('Should return a product by id', async () => {

//       const productCreated = await productsDaoMongoDb.createNewProduct(productMock)

//       const productSearched = await productsService.getProductById(productCreated._id)

//       assert(productCreated, productSearched)
//   })
// });
