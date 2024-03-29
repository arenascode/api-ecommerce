import { UploadFileError, errors, validationError } from "../models/error/errors.js";
import usersService from "../services/users.service.js";
import { logger } from "../utils/logger.js";
import { CLIENT_URL } from "../config/env.config.js";

export async function handleGet(req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    const usersWithUrl = {
      users,
      CLIENT_URL
    } 
    res.status(200).json(usersWithUrl);
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
    logger.debug(userCreated)
    // res.json(userCreated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePut(req, res, next) {
  try {
    const newData = req.body;

    if (req.files.length > 0) {
      console.log(`or enter here?`);
      const staticWord = "static";
      const trimmingPath = req.files[0].path.slice(6);
      console.log(trimmingPath);
      const newImgPath = staticWord + trimmingPath;
      const newPhoto = {
        profilePhoto: newImgPath,
      };

      const userUpdated = await usersService.updateUser(req.params.uid, newPhoto)

      res.status(201).json({userUpdated, CLIENT_URL});
    } else {
      logger.debug(`enter here?`)
      const userUpdated = await usersService.updateUser(req.params.uid, newData);
      console.log(userUpdated);
      res.status(201).json({userUpdated, CLIENT_URL});
    }
    
  } catch (error) {
    console.log(error);
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
