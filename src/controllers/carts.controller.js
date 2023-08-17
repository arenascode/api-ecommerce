import cartsService from "../services/carts.services.js";

export async function handleGetAll(req, res, next) {
  try {
    const carts = await cartsService.getAllCarts()
    res.json(carts)
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleGetById(req, res, next) {
  try {
    console.log(req.params.cid);
    const cartById = await cartsService.getCartById(req.params.cid);
    res.json(cartById);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePost(req, res, next) {
  try {
    const dataNewCart = req.body
    const userId = req.user._id
    const cartCreated = await cartsService.createNewCart(dataNewCart, userId);
    res.json(cartCreated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
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
    res.json.status(400).json({ errorMsg: error.message });
  }
}

export async function confirmPurchase(req, res, next) {
  try {
    console.log(req.params.cid);
    await cartsService.confirmPurchase(req.params.cid)
    res.send(`testing endpoint`)
  } catch (error) {
    
  }
}

export async function updateProductQuantity(req, res, next) {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const newQty = req.body
    const cart = await cartsService.getCartById(cid)
    const productToUpdateQty = cart.products.find(product => product._id._id == pid)
    productToUpdateQty.quantity = newQty.quantity
    cart.save()
    res.json(cart)
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
}

export async function deleteProductInCart(req, res, next) {
  const cid = req.params.cid
  const pid = req.params.pid
  try {
    const cart = await cartsService.getCartById(cid)
    const cartWithoutProduct = cart.products.filter(product => product._id._id != pid)
    cart.products = cartWithoutProduct
    cart.save()
    console.log(cart);
    res.json(cart)
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleDeleteProductsInCart(req, res, next) {
  try {
    const cart = await cartsService.getCartById(req.params.cid);
    cart.products = []
    cart.save()
    res.json(cart);
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
}

export async function deleteAllCarts(req, res, next) {
  try {
    const resultOfDelete = await cartsService.deleteAllCarts();
    res.send(resultOfDelete);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}