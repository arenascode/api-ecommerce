import { ErrorNotFound, UploadFileError, errors, validationError } from "../models/error/errors.js";
import mailService from "../services/mail.service.js";
import usersService from "../services/users.service.js";
import {
  generateAToken,
  generateATokenToRestorePass,
} from "../utils/cryptography.js";
import { logger } from "../utils/logger.js";
import { CLIENT_URL } from "../config/env.config.js";

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
    console.log(`File from controller ${JSON.stringify(req.files[0]['path'])}`);

    if (req.files) {
      const newPhoto = {
        profilePhoto: req.files[0].path,
      };
      const userPhotoUpdated = await usersService.updateUser(req.params.uid, newPhoto)
      res.status(201).json({userPhotoUpdated, CLIENT_URL});
    } else {
      const userUpdated = await usersService.updateUser(req.params.uid, newData);
    res.status(201).json({userUpdated, CLIENT_URL});
    }
    
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function changeUserRole(req, res, next) {
  try {
    const uid = req.params.uid;
    const role = { role: req.query.role };
    const user = await usersService.getUserById(uid)
    console.log(user.documents.length);
    if (!user.status) {
      throw new validationError('You must upload your documents first in order to change your role.')
    }
    if (role.role === 'premium' && user.documents.length < 3) {
      throw new validationError(
        "You are missing some document. Please make sure to upload everything in order to be premium"
      );
    }
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
