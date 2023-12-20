import Cart from "../entities/Cart.js";
import cartsRepository from "../repositories/carts.repository.js";
import usersRepository from "../repositories/users.repository.js";
import Ticket from "../entities/Ticket.js";
import productsRepository from "../repositories/products.repository.js";
import mailService from "./mail.service.js";
import productsService from "./products.service.js";
import { logger } from "../utils/logger.js";
import { errors, validationError } from "../models/error/errors.js";

class CartsService {
  async getAllCarts() {
    //Develop Logic relative to Mongoose pagination
    return await cartsRepository.getAllCarts();
  }

  async getCartById(cartId) {
    return await cartsRepository.getCartById(cartId);
  }

  async createNewCart(dataNewCart, userId) {
    logger.debug(`dataNewCart ${JSON.stringify(dataNewCart)}`);

    const productInStock = await productsService.getProductById(
      dataNewCart.pid
    );
    console.log(productInStock);

    if (productInStock.stock <= 0) {
      throw errors.outOfStock;
    }
    const newProductToCart = {
      _id: {...productInStock},
      quantity: dataNewCart.quantity,
    };

    const userExist = await usersRepository.getUserById(userId);
    logger.debug(`userExist ${userExist}`);
    
    if (userExist._id == productInStock.owner) {
      throw new validationError("You can't buy a product added by you");
    }
    logger.debug(`cartIdInUser ${userExist.cart}`)
    if (userExist.cart) {
      // console.log(`user has a cart ${userExist.cart._id}`);
      // console.log(`userExist.cart ${JSON.stringify(userExist.cart)}`);
      // console.log(`Cart of user PIC ${JSON.stringify(product)}`);
      const productInCartExist = await cartsRepository.findProductInCart(
        userExist.cart._id,
        dataNewCart.pid
      );
      console.log(`productInCartExist ${JSON.stringify(productInCartExist)}`);
      if (productInCartExist) {
        console.log(`productInCartExist ${productInCartExist}`);
        const productToUpdate = productInCartExist.products.find(
          (p) => p._id._id == dataNewCart.pid
        );
        console.log(`productToUpdate ${productToUpdate}`);
        productToUpdate.quantity += dataNewCart.quantity;

        productInCartExist.save();
        return productInCartExist;
      } else {
        const cartToUpdate = await cartsRepository.getCartById(userExist.cart);

        console.log(`cartToUpdate.products ${cartToUpdate}`);

        cartToUpdate.products.push(newProductToCart);

        cartToUpdate.save();
        // const newCart = await cartsRepository.getCartById(userExist.cart)
        // console.log(`userExistBef ${JSON.stringify(userExist.cart)}`);
        // console.log(newCart);
        return cartToUpdate;
      }
    } else {
      const newCart = new Cart(userExist._id);
      newCart.products.push(newProductToCart);

      const cartCreated = await cartsRepository.createNewCart(newCart);

      await usersRepository.updateUser(userExist._id, {
        cart: cartCreated._id,
      });
      return cartCreated;
    }
  }

  async addProductToCart(pid, cid) {
    return cartsRepository.addProductToCart(pid, cid);
  }

  async updateCart(cartId, newData) {
    return await cartsRepository.updateCart(cartId, { products: newData }); //newData must be an object
  }

  async confirmPurchase(cid) {
    const cartPurchased = await cartsRepository.getCartById(cid);
    console.log(JSON.stringify(cartPurchased));
    let productsInStock = cartPurchased.products.filter(
      (p) => p.quantity <= p._id.stock
    );
    console.log(`PIS ${productsInStock}`);
    let productsOutOfStock = cartPurchased.products.filter(
      (p) => p.quantity >= p._id.stock
    );
    // console.log(`POOS ${productsOutOfStock}`);

    let totalAmount = 0;
    let purchasedProducts = [];
    productsInStock.forEach((p) => {
      totalAmount += p._id.price * p.quantity;
      console.log(totalAmount);
      let productBuyed = {
        title: p._id.title,
        price: p._id.price,
        quantity: p.quantity,
      };
      purchasedProducts.push(productBuyed);
    });

    console.log(`TotalAMount ${totalAmount}`);
    const purchaser = await usersRepository.getUserById(cartPurchased.user);
    // console.log(`Purchaser ${purchaser}`);
    const newTicket = new Ticket(totalAmount, purchaser.email);
    if (!newTicket) {
      throw new Error("Error generating Ticket. Try again");
    }

    // Send an email to the user to notify him of the purchase
    await mailService.sendmailToConfirmPurchase(
      purchasedProducts,
      newTicket,
      purchaser.email
    );
    // update products stock
    await Promise.all(
      productsInStock.map(async (p) => {
        const product = await productsRepository.getProductById(p._id);
        let productInCart = cartPurchased.products.find(
          (buyedProd) => buyedProd._id == p.id
        );
        // console.log(`productToUpdateStock ${product}`);
        console.log(`productInCartIsTheSame ${productInCart}`);
        product.stock -= productInCart.quantity;
        product.save();
        console.log(`new Stock In product${JSON.stringify(product)}`);
      })
    );
    cartPurchased.products = productsOutOfStock;
    cartPurchased.save();
    return newTicket;
  }

  async deleteCart(cartId) {
    return await cartsRepository.deleteCart(cartId);
  }

  async deleteAllCarts() {
    return await cartsRepository.deleteAllCarts();
  }
}

const cartsService = new CartsService();

export default cartsService;
