import { Logger } from "winston";
import productsService from "../services/products.service.js";
import { logger } from "../utils/logger.js";
import usersRepository from "../repositories/users.repository.js";
import usersService from "../services/users.service.js";
import { validationError } from "../models/error/errors.js";
import { CLIENT_URL } from "../config/env.config.js";
import mailService from "../services/mail.service.js";

export async function handleGetAll(req, res, next) {
  try {
    const querys = {
      title: req.query.title,
      category: req.query.category
    }
    logger.debug(`category ${querys.category}`);
    const sortPrice = parseInt(req.query.sortprice)
    logger.debug(`sortPrice ${sortPrice}`);
    const page = req.query.page
    logger.debug(`page ${page}`);

    const products = await productsService.getAllProducts(querys, sortPrice, page);
    
    const productsWithClientURL = {
      products,
      CLIENT_URL
    }
    res.json(productsWithClientURL);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
  
}

export async function handleGetById(req, res, next) {
  try {
    const productById = await productsService.getProductById(req.params.pid);
    const productByIdWithClientURL = {
      productById,
      CLIENT_URL
    }
  res.json(productByIdWithClientURL);
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
  
}

export async function handlePost(req, res, next) {
  try {
    const dataNewProduct = req.body;
    const productOwner = req.user
    const files = req.files
    console.log(files);
    // console.log(dataNewProduct);
    // console.log(productOwner);
    const staticWord = '/static'
    const trimmingPath = (req.files[0].path).slice(6)
    console.log(trimmingPath);
    const newImgPath = staticWord + trimmingPath
    const dataWithProductImg = { ...dataNewProduct, thumbnails: newImgPath}
    console.log(dataWithProductImg);
    const productCreated = await productsService.createNewProduct(dataWithProductImg, productOwner);
    res.json(productCreated);
  } catch (error) {
     res.status(400).json({ errorMsg: error.message});
  }
}

export async function handlePut(req, res, next) {
  try {
    const productId = req.params.pid;
    const newData = req.body;
    const fileData = req.files;
    console.log(newData);
    console.log(fileData);
    const staticWord = '/static'
    const trimmingPath = (req.files[0].path).slice(6)
    const newImgPath = staticWord + trimmingPath
    const dataWithPic = {...newData, thumbnails: newImgPath}
    
    const productUpdated = await productsService.updateProduct(
      productId,
      dataWithPic
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
      const userOwnOfProduct = await usersService.findUserByCriteria({email: productToDelete.owner})
      if (userOwnOfProduct.role === 'premium') {
        await mailService.sendMailToNotifyOfProductDeleted(userOwnOfProduct, productDeleted)
      }
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
