import Joi from "joi";
import { hash } from "../utils/cryptography.js";

function validateFirstName(first_name) {
  const { error, value } = Joi.string().min(3).required().validate(first_name);
  if (error) throw new Error(`${error.message}: First Name`);
  return value;
}

function validateLastName(last_name) {
  const { error, value } = Joi.string().min(3).required().validate(last_name);
  if (error) throw new Error(`${error.message}: Last Name`);
  return value;
}

function validateEmail(email) {
  const { error, value } = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .validate(email);
  if (error) throw new Error(`${error.message}: Email`);
  return value;
}

function validatePassword(password) {
  const { error, value } = Joi.string().min(6)
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=[\\]{};:'\\\",.<>/?\\\\|]{6,30}$")
    )
    .required()
    .validate(password);
  if (error) throw new Error(`${error.message}: Password`);
  return value;
}

function validateAge(age) {
  const { error, value } = Joi.number().integer().max(100).required().validate(age)
  if (error) throw new Error(`${error.message}: Age`);
  return value 
}

function getCurrentDateAsString() {
  return Date().toString()
}

export default class User {
  constructor({first_name, last_name, email, password, age, status=false, cart=null, role = "user", documents = null, last_connection = getCurrentDateAsString()}) {
    this.first_name = validateFirstName(first_name)
    this.last_name = validateLastName(last_name)
    this.email = validateEmail(email)
    this.password = hash(validatePassword(password));
    this.age = validateAge(age);
    this.role = role;
    this.cart = cart;
    this.documents = documents
    this.last_connection = last_connection
    this.status = status 
  }
}

