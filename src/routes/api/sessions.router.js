import { Router } from "express"
import * as sessionsController from "../../controllers/sessions.controller.js"
import  * as passport  from "../../middlewares/passport.js"
import { passportCall } from "../../utils/passportCall.js"


export const routerSessions = Router()

routerSessions.post('/register',sessionsController.isAlreadyRegisteredUser, passport.registerAuthentication, sessionsController.userRegister)


routerSessions.post('/login', passport.loginAuthentication, sessionsController.userLogin)

routerSessions.get('/current', passportCall('jwt'), passport.authenticationJWTApi, sessionsController.currentSession)

routerSessions.get('/logout', sessionsController.userLogOut)

routerSessions.get('/github', passport.githubAuthentication)

routerSessions.get('/githubcallback', passport.githubAuthentication_CB, sessionsController.githubLogin)

// to get access token from query fy frontend
routerSessions.get('/getGhToken',
  sessionsController.getGhToken)
//TO_DO
//To get User Data Grom GH
 routerSessions.get('/getGhUser', sessionsController.getGhUser)
//Restore Password
// Step 1. 
routerSessions.post('/restorePassword/sendMail', sessionsController.confirmMailToRestorePassword)
// Step 2.
routerSessions.post('/restorePassword/newPass', sessionsController.newPassword)
