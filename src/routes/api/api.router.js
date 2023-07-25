import { Router } from "express";
import { routerProducts } from "./products.router.js";

export const apiRouter = Router()

apiRouter.use('/products', routerProducts)