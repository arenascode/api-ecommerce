import { ErrorNotFound, UploadFileError, errors } from "../models/error/errors.js";
import mailService from "../services/mail.service.js";
import usersService from "../services/users.service.js";
import {
  generateAToken,
  generateATokenToRestorePass,
} from "../utils/cryptography.js";
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

export async function changeUserRole(req, res, next) {
  try {
    const uid = req.params.uid;
    const role = { role: req.query.role };
    const roleChanged = await usersService.updateUser(uid, role);
    res["sendSuccess"](`The user role was changed to ${roleChanged.role}`);
  } catch (error) {
    res['sendClientError'](error.message)
  }
}

export async function uploadDocuments(req, res, next) {

  try {
    console.log(req.files);
    const userFiles = req.files
    if (!userFiles) {
      return res['sendClientError']('Cannot save the file. Try again')
    }
    let documents = []


    userFiles.forEach(document => {
      const fileToSave = {
        name: document.fieldname,
        reference: document.path
      }
      documents.push(fileToSave)
    });
    await usersService.updateUser(req.params.uid, {documents, status: true} )
    res.send(`Thank you. We received your documents`)
  } catch (error) {
    errors.uploadFileError.logError()
    throw new UploadFileError(error.message, `Error uploading files`)
    // res.send(`Thank you. We received your documents`);
    
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
