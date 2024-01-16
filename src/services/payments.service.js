import Stripe from "stripe"
import cartsRepository from "../repositories/carts.repository.js"
import { STRIPE_SECRET_KEY } from "../config/env.config.js"

const stripe = new Stripe(STRIPE_SECRET_KEY)

class PaymentsService {

  async createIntent(amount) {

    const paymentIntentInfo = {
      amount,
      currency: 'usd'
    }
    
    const intent = await stripe.paymentIntents.create(paymentIntentInfo)
    console.log(intent);
    return intent
  }
}

const paymentsService = new PaymentsService()

export default paymentsService