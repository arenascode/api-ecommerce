import { Router } from "express";
import { routerProducts } from "./products.router.js";
import { routerUsers } from "./users.router.js";
import { routerCarts } from "./carts.router.js";

export const apiRouter = Router()

// Products
apiRouter.use('/products', routerProducts)

//Users
apiRouter.use('/users', routerUsers)

//Carts
apiRouter.use('/carts', routerCarts)