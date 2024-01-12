import { Router } from "express";
import { routerProducts } from "./products.router.js";
import { routerUsers } from "./users.router.js";
import { routerCarts } from "./carts.router.js";
import { routerSessions } from "./sessions.router.js";
import { responseMiddleware } from "../../middlewares/responseMethods.js";
import ordersRouter from "./tickets.router.js";

export const apiRouter = Router()

// Products
apiRouter.use('/products', routerProducts)

//Users
apiRouter.use('/users', routerUsers)

//Carts
apiRouter.use('/carts', routerCarts)

apiRouter.use('/sessions', routerSessions)

apiRouter.use('/orders', ordersRouter)
