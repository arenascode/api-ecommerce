import cartsService from "../services/carts.services.js";

export async function handleGetAll(req, res, next) {
  try {
    const carts = await cartsService.getAllCarts()
    res.json(carts)
  } catch (error) {
    res.json({ errorMsg: error.message });
  }
}

export async function handleGetById(req, res, next) {
  try {
    console.log(req.params.cid);
    const cartById = await cartsService.getCartById(req.params.cid);
    res.json(cartById);
  } catch (error) {
    res.json({ errorMsg: error.message });
  }
}

export async function handlePost(req, res, next) {
  try {
    const dataNewCart = req.body
    const userId = req.params.uid //check later
    const cartCreated = await cartsService.createNewCart(dataNewCart, userId);
    res.json(cartCreated);
  } catch (error) {
    res.json({ errorMsg: error.message });
  }
}

export async function handlePut(req, res, next) {
  try {
    const cartId = req.params.cid;
    const newData = req.body;
    const cartUpdated = await cartsService.updateCart(
      cartId,
      newData
    );
    res.json(cartUpdated);
  } catch (error) {
    res.json({ errorMsg: error.message });
  }
}

export async function handleDeletebyId(req, res, next) {
  try {
    const cartDeleted = await cartsService.deleteCart(req.params.cid);
    res.json(cartDeleted);
  } catch (error) {
    res.json({errorMsg: error.message})
  }
}

export async function deleteAllCarts(req, res, next) {
  try {
    const resultOfDelete = await cartsService.deleteAllCarts();
    res.send(resultOfDelete);
  } catch (error) {
    res.json({ errorMsg: error.message });
  }
}