import { Router } from "express";
import * as usersController from "../../controllers/users.controller.js"
import { uploader } from "../../utils/multer.js";
export const routerUsers = Router()

//Get all Users
routerUsers.get('/', usersController.handleGet)

//Get User By Id
routerUsers.get('/:uid', usersController.handleGetById)

//Create New User
routerUsers.post('/', usersController.handlePostNewUser)

//Update User
routerUsers.put('/:uid', usersController.handlePut)

//Change User Role
routerUsers.put('/premium/:uid', usersController.changeUserRole)

//Delete User 
routerUsers.delete('/:uid', usersController.handleDelete)

routerUsers.post('/:uid/documents', uploader.any('profileImg', 'productImg', 'documentUser'), usersController.uploadDocuments)




