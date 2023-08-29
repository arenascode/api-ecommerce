import { Router } from "express";
import * as usersController from "../../controllers/users.controller.js"
export const routerUsers = Router()

//Get all Users
routerUsers.get('/', usersController.handleGet)

//Get User By Id
routerUsers.get('/:uid', usersController.handleGetById)

//Create New User
routerUsers.post('/', usersController.handlePostNewUser)

//Update User
routerUsers.put('/:uid', usersController.handlePut)

//Delete User 
routerUsers.delete('/:uid', usersController.handleDelete)

//Restore password User 
routerUsers.get('/restorePassword/sendMail', usersController.sendMailToRestorePassword)

routerUsers.post('/restorePassword/newPass', usersController.confirmMailAndRestorePassword)

