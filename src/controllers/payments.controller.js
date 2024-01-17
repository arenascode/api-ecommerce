import paymentsService from "../services/payments.service.js";

export async function handlePost(req, res, next) {
  try {
    
    const amount = Number(req.body.subTotal)
    console.log(amount);
    const intent = await paymentsService.createIntent(amount);
    res.status(201).json({ status: "success", payload: intent });
  } catch (error) {
    next(error);
  }
}
