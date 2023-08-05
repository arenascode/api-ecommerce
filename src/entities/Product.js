import Joi from "joi"

function validateTitle(title) {
  const { error, value } = Joi.string().min(3).required().validate(title)
  if (error) throw new Error(`${error.message}: Product Title`)
  return value
}
function validateDescription(description) {
  const { error, value } = Joi.string().min(3).required().validate(description)
  if (error) throw new Error(`${error.message}: Product Description`)
  return value
}
function validateCode(code) {
  const { error, value } = Joi.string().min(2).required().validate(code)
  if (error) throw new Error(`${error.message}: Product Code`)
  return value
}
function validatePrice(price) {
  const { error, value } = Joi.number().greater(100).required().validate(price)
  if (error) throw new Error(`${error.message}: Product Price`)
  return value
}
function validateStock(stock) {
  const { error, value } = Joi.number().min(1).required().validate(stock)
  if (error) throw new Error(`${error.message}: Product Stock`)
  return value
}
function validateCategory(category) {
  const { error, value } = Joi.string().min(3).required().validate(category);
  if (error) throw new Error(`${error.message}: Product Category`);
  return value;
}

export default class Product {

  constructor({title, description, code, price, status= false, stock, category, thumbnails= [], owner}) {
    this.title = validateTitle(title)
    this.description = validateDescription(description)
    this.code = validateCode(code)
    this.price = validatePrice(price)
    this.status = status
    this.stock = validateStock(stock)
    this.category = validateCategory(category)
    this.thumbnails = thumbnails
    this.owner= owner
  }
}


