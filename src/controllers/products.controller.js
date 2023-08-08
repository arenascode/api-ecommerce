import productsService from "../services/products.service.js";

export async function handleGetAll(req, res, next) {
  try {
    const querys = {
      title: req.query.title,
      category: req.query.category
    }
    const sortPrice = req.query.sortprice
    const page = req.query.page

    const products = await productsService.getAllProducts(querys, sortPrice, page);

    res.json(products);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
  
}

export async function handleGetById(req, res, next) {
  try {
    const productById = await productsService.getProductById(req.params.pid);
  res.json(productById);
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
  
}

export async function handlePost(req, res, next) {
  try {
    const dataNewProduct = req.body;
    const productCreated = await productsService.createNewProduct(dataNewProduct);
    res.json(productCreated);
  } catch (error) {
     res.status(400).json({ errorMsg: error.message});
  }
}

export async function handlePut(req, res, next) {
  try {
    const productId = req.params.pid;
    const newData = req.body;
    const productUpdated = await productsService.updateProduct(
      productId,
      newData
    );
    res.json(productUpdated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleDeletebyId(req, res, next) {
  try {
    const productDeleted = await productsService.deleteProduct(req.params.pid);
  res.json(productDeleted);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function deleteAllProducts(req, res, next) {
  try {
    const resultOfDelete = await productsService.deleteAllProducts();
  res.send(resultOfDelete);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
  
}
