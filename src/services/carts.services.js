import Cart from "../entities/Cart.js";
import cartsRepository from "../repositories/carts.repository.js";
import usersRepository from "../repositories/users.repository.js";
import Ticket from "../entities/Ticket.js"
class CartsService {

  async getAllCarts() {
    //Develop Logic relative to Mongoose pagination
    return await cartsRepository.getAllCarts();
  }

  async getCartById(cartId) {
    return await cartsRepository.getCartById(cartId);
  }

  async createNewCart(dataNewCart, userId) {
    console.log(`dataNewCart ${dataNewCart}`);
    const newProductToCart = {
      _id: dataNewCart.pid,
      quantity: dataNewCart.quantity,
    };

    const userExist = await usersRepository.getUserById(userId)
    console.log(`userExist ${userExist}`);

    if (userExist.cart._id) {
      // console.log(`user has a cart ${userExist.cart._id}`);
      // console.log(`userExist.cart ${JSON.stringify(userExist.cart)}`);
      // console.log(`Cart of user PIC ${JSON.stringify(product)}`);
      const productInCartExist = await cartsRepository.findProductInCart(userExist.cart._id, dataNewCart.pid)
      console.log(`productInCartExist ${JSON.stringify(productInCartExist)}`);
      if (productInCartExist) {
        console.log(`productInCartExist ${productInCartExist}`);
        const productToUpdate = productInCartExist.products.find(p => p._id._id == dataNewCart.pid);
        console.log(`productToUpdate ${productToUpdate}`);
        productToUpdate.quantity += dataNewCart.quantity

        productInCartExist.save()
        return productInCartExist
      } else {
        const cartToUpdate = await cartsRepository.getCartById(userExist.cart)

        console.log(`cartToUpdate.products ${cartToUpdate}`);

        cartToUpdate.products.push(newProductToCart)

        cartToUpdate.save()
        return cartToUpdate
      }
    } else {
      const newCart = new Cart(userExist._id)
      newCart.products.push(newProductToCart)

      const cartCreated = await cartsRepository.createNewCart(newCart);

      await usersRepository.updateUser(userExist._id, { cart: cartCreated._id })
      return cartCreated
    }
  }

  async addProductToCart(pid, cid) {
    return cartsRepository.addProductToCart(pid, cid)
  }

  async updateCart(cartId, newData) {

    return await cartsRepository.updateCart(cartId, {products: newData}); //newData must be an object
  }

  async confirmPurchase(cid) {
    const cartPurchased = await cartsRepository.getCartById(cid)
    console.log(JSON.stringify(cartPurchased));
    let producstInStock = cartPurchased.products.filter(p => p.quantity <= p._id.stock)
    console.log(`PIS ${producstInStock}`);
    let producstOutOfStock = cartPurchased.products.filter(p => p.quantity >= p._id.stock)
    // console.log(`POOS ${producstOutOfStock}`);

    let totalAmount = 0
    producstInStock.forEach(p => {
      totalAmount += p._id.price * p.quantity
      console.log(totalAmount)
    })
    console.log(`TotalAMount ${totalAmount}`);
    const purchaser = await usersRepository.getUserById(cartPurchased.user)
    console.log(`Purchaser ${purchaser}`);
    const newTicket = new Ticket(totalAmount, purchaser.email)
    console.log(`NewTicket ${JSON.stringify(newTicket)}`);
    // Send an email to the user to notify him of the purchase
    if (newTicket) {
      
    }
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