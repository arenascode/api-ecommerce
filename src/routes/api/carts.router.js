import { Router } from "express";
import * as cartsController from "../../controllers/carts.controller.js";

export const routerCarts = Router()

//Get all carts
routerCarts.get('/', cartsController.handleGetAll)

//Get cart By Id 
routerCarts.get('/:cid', cartsController.handleGetById)

//Create New Cart
routerCarts.post('/', cartsController.handlePost)

//update Cart
routerCarts.put('/:cid', cartsController.handlePut)

//Delete Cart 
routerCarts.delete('/:cid', cartsController.handleDeletebyId)

//Delete all Carts 
routerCarts.delete('/', cartsController.deleteAllCarts)


