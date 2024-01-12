import { Router } from "express";
import { authenticationJWTApi } from "../../middlewares/passport.js";
import { isAdmin } from "../../middlewares/handlePolicies.js";
import * as ticketsController from "../../controllers/tickets.controller.js"

const ordersRouter = Router()

ordersRouter.get('/', authenticationJWTApi, isAdmin, ticketsController.handleGetTickets)

export default ordersRouter