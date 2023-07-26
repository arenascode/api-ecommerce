import productsService from "../services/products.service.js";

export async function handleGetAll(req, res, next) {
  const products = await productsService.getAllProducts()
  res.json(products)
}

export async function handleGetById(req, res, next) {
  const productById = await productsService.getProductById(req.params.pid)
  res.json(productById)
}

export async function handlePost(req, res, next) {
  const productCreated = await productsService.createNewProduct()
  res.json(productCreated)
}

export async function handlePut(req, res, next) {
  const productId = req.params.pid
  const newData = req.body
  const productUpdated = await productsService.updateProduct(productId, newData)
  res.json(productUpdated);
}

export async function handleDeletebyId(req, res, next) {
  const productDeleted = await productsService.deleteProduct(req.params.pid)
  res.json(productDeleted)
}

export async function deleteAllProducts(req, res, next) {
  await productsService.deleteAllProducts()
  res.send(`here we going to delete all existing products.`)
}