import { Logger } from "winston";
import productsService from "../services/products.service.js";
import { logger } from "../utils/logger.js";
import usersRepository from "../repositories/users.repository.js";
import usersService from "../services/users.service.js";
import { validationError } from "../models/errors.js";

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
    const productOwner = req.user

    const productCreated = await productsService.createNewProduct(dataNewProduct, productOwner);
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
    const user = await usersService.getUserById(req.user._id)
    logger.debug(`user handleDelete ${JSON.stringify(user)}`)
    const productToDelete = await productsService.getProductById(req.params.pid)
    logger.debug(`productToDelete ${productToDelete}`)
    if (user.role === 'admin') {
      const productDeleted = await productsService.deleteProduct(
        req.params.pid
      );
      res['sendSuccess']('Product Succesfully Removed');
    } else {
      if (user.email !== productToDelete.owner) {
      throw new validationError("You can't delete a product that you don't own")  
    } else {
      logger.debug("The user it's able to delete his product")
      const productDeleted = await productsService.deleteProduct(req.params.pid);
      res['sendSuccess']('Product Succesfully Removed');
    }
    }
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
