import { Router } from "express";
import * as cartsController from "../../controllers/carts.controller.js";
import { authenticationJWTApi } from "../../middlewares/passport.js";
import { isAdmin, isUser } from "../../middlewares/handlePolicies.js";

export const routerCarts = Router()

//Get all carts
routerCarts.get('/', authenticationJWTApi, isAdmin, cartsController.handleGetAll)

//Get cart By Id 
routerCarts.get('/:cid', cartsController.handleGetById)

//Create New Cart
routerCarts.post(
  "/",
  authenticationJWTApi, isUser,
  cartsController.handlePost
); // Remove :uid after test

//update Cart
routerCarts.put('/:cid', cartsController.handlePut)

//Delete Cart 
routerCarts.delete('/:cid', cartsController.handleDeleteProductsInCart)

//Update Quantity of one Product
routerCarts.put('/:cid/products/:pid', cartsController.updateProductQuantity)

//Confirm purchase
routerCarts.get('/:cid/purchase', cartsController.confirmPurchase)

//Delete Specific Product
routerCarts.delete('/:cid/products/:pid', cartsController.deleteProductInCart)

//Delete all Carts 
routerCarts.delete('/', cartsController.deleteAllCarts)


