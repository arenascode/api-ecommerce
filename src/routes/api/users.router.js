import { Router } from "express";
import * as usersController from "../../controllers/users.controller.js"
import { uploader } from "../../utils/multer.js";
import { isAdmin } from "../../middlewares/handlePolicies.js";
import { authenticationJWTApi } from "../../middlewares/passport.js";
export const routerUsers = Router()

//Get all Users
routerUsers.get('/',authenticationJWTApi, isAdmin, usersController.handleGet)

//Get User By Id
routerUsers.get('/:uid', usersController.handleGetById)

//Create New User
routerUsers.post('/', usersController.handlePostNewUser)

//Update User
routerUsers.put('/:uid', uploader.any(), usersController.handlePut)

//Change User Role
routerUsers.put('/premium/:uid', usersController.changeUserRole)

//Change User Role by Admin
routerUsers.put('/changeUserRoleByAdmin/:uid',authenticationJWTApi, isAdmin, usersController.handlePut)

//Delete User 
routerUsers.delete('/:uid', usersController.handleDelete)

routerUsers.post('/:uid/documents', uploader.any('profileImg', 'productImg', 'documentUser'), usersController.uploadDocuments)




