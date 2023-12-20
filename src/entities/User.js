import Joi from "joi";
import { hash } from "../utils/cryptography.js";
import { validationError } from "../models/error/errors.js";
import { logger } from "../utils/logger.js";

function validateFirstName(first_name) {
  console.log(`validateFirstName ${first_name}`);
  const { error, value } = Joi.string().min(3).required().validate(first_name);
  console.log(`value: ${value}`);
  if (error instanceof validationError) {
    throw new validationError(error.message, "first_NameInput", {
      module: "UserEntity",
    });

    // errorInstance.logError()
    // throw errorInstance
  }

  return value;
}

function validateLastName(last_name) {
  console.log(`validateLastName ${last_name}`);
  const { error, value } = Joi.string().min(3).required().validate(last_name);
  console.log(`value: ${value}`);

  if (error instanceof validationError) {
    const errorInstance = new validationError(error.message, "lastNameInput", {
      module: "UserEntity",
    });

    errorInstance.logError();
    throw errorInstance;
  }
  return value;
}

function validateEmail(email) {
  console.log(`validateEmail ${email}`);
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    const errorInstance = new validationError(
      "Invalid Email. Please check it",
      "User Entity",
      "Line: 38"
    );
    errorInstance.logError();
    throw errorInstance;
  }
  return email;
}

function validatePassword(password) {
  console.log(`validatePAssword ${password}`);
  const { error, value } = Joi.string()
    .min(6)
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=[\\]{};:'\\\",.<>/?\\\\|]{6,30}$")
    )
    .required()
    .validate(password);
  console.log(`value: ${value}`);
  if (error) {
    // const errorInstance = new validationError(error.message, "passwordInput", {
    //   module: "UserEntity",
    // });
    // errorInstance.logError();
    logger.error(`error password validation`)
    throw new Error(error.message);
  }
  return value;
}

function validateAge(age) {
  console.log(typeof age);
  const { error, value } = Joi.number()
    .integer()
    .max(100)
    .required()
    .validate(age);
  console.log(`value: ${value}`);
  if (error) {
    if (error) {
      const errorInstance = new validationError(error.message, "Age Input", {
        module: "UserEntity",
      });
      errorInstance.logError();
      throw errorInstance;
    }
  }
  return value;
}

function getCurrentDateAsString() {
  return Date().toString();
}

export default class User {
  constructor({
    first_name,
    last_name,
    email,
    password,
    age = 0,
    status = false,
    cart = null,
    role = "user",
    documents = null,
    last_connection = getCurrentDateAsString(),
    profilePhoto = null 
  }) {
    this.first_name = validateFirstName(first_name);
    this.last_name = validateLastName(last_name);
    this.email = validateEmail(email);
    this.password = hash(validatePassword(password));
    this.age = validateAge(age);
    this.role = role;
    this.cart = cart;
    this.documents = documents;
    this.last_connection = last_connection;
    this.status = status;
    this.profilePhoto = profilePhoto
  }
}
