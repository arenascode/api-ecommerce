import usersService from "../services/users.service.js";
import { generateAToken } from "../utils/cryptography.js";
import { logger } from "../utils/logger.js";

export async function handleGet(req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleGetById(req, res, next) {
  try {
    const userById = await usersService.getUserById(req.params.uid);
    console.log(userById);
    res.json(userById);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePostNewUser(req, res, next) {
  try {
    const dataNewUser = req.body;
    const userCreated = await usersService.createNewUser(dataNewUser);
    res.json(userCreated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePut(req, res, next) {
  try {
    const newData = req.body;
    const userUpdated = await usersService.updateUser(req.params.uid, newData);
    res.json(userUpdated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleDelete(req, res, next) {
  try {
    const userDeleted = await usersService.deleteUser(req.params.uid);
    res.json({ msg: `The User ${userDeleted} was deleted` });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function sendMailToRestorePassword(req, res, next) {
  res.render("sendMail", {
    pageTitle: "SendMailToRestorePassword",
  });
}

export async function confirmMailAndRestorePassword(req, res, next) {
  try {
    logger.debug(JSON.stringify(req.body));
    const user = await usersService.restoreUserPassword(req.body);
    res.cookie("jwt_authorization", generateAToken(user), {
      signed: true,
      httpOnly: true,
    }).send('Please Chek Your Email To Continue restoring your password.');
  } catch (error) {
    res["sendError"](error.message);
  }
}
