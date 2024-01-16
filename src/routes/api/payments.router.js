import { Router } from "express";
import * as paymentsController from "../../controllers/payments.controller.js"

const paymentsRouter = Router()

paymentsRouter.post('/payment-intents', paymentsController.handlePost)

export default paymentsRouter