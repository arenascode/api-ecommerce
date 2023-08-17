import { Router } from "express";
import * as productsController from "../../controllers/products.controller.js";
import { isAdmin } from "../../middlewares/handlePolicies.js";

export const routerProducts = Router()

// To Get all Products
routerProducts.get("/", productsController.handleGetAll)

// To get a product by ID
routerProducts.get('/:pid', productsController.handleGetById)

//To create a product
routerProducts.post('/', isAdmin , productsController.handlePost)

// To update a product
routerProducts.put('/:pid', productsController.handlePut)

// To delete a product 
routerProducts.delete('/:pid', productsController.handleDeletebyId)

routerProducts.delete('/', productsController.deleteAllProducts)

