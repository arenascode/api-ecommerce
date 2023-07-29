import cartsService from "../services/carts.services.js";

export async function handleGetAll(req, res, next) {
  const carts = await cartsService.getAllCarts()
  res.json(carts)
}

export async function handleGetById(req, res, next) {
  console.log(req.params.cid);
  const cartById = await cartsService.getCartById(req.params.cid);
  res.json(cartById);
}

export async function handlePost(req, res, next) {
  const dataNewCart = req.body
  const userId = req.params.uid //check later
  const cartCreated = await cartsService.createNewCart(dataNewCart, userId);
  res.json(cartCreated);
}

export async function handlePut(req, res, next) {
  const cartId = req.params.cid;
  const newData = req.body;
  const cartUpdated = await cartsService.updateCart(
    cartId,
    newData
  );
  res.json(cartUpdated);
}

export async function handleDeletebyId(req, res, next) {
  const cartDeleted = await cartsService.deleteCart(req.params.cid);
  res.json({ msg: 'The cart Was succesfull deleted'});
}

export async function deleteAllCarts(req, res, next) {
  await cartsService.deleteAllcarts();
  res.send(`here we going to delete all existing carts.`);
}