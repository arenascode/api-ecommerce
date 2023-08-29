import { Router } from "express"
import * as sessionsController from "../../controllers/sessions.controller.js"
import  * as passport  from "../../middlewares/passport.js"
import { passportCall } from "../../utils/passportCall.js"


export const routerSessions = Router()

routerSessions.post('/register', passport.registerAuthentication, sessionsController.userRegister)


routerSessions.post('/login', passport.loginAuthentication, sessionsController.userLogin)

routerSessions.get('/current', passportCall('jwt'), passport.authenticationJWTApi, sessionsController.currentSession)

routerSessions.get('/logout', sessionsController.userLogOut)

routerSessions.get('/github', passport.githubAuthentication)

routerSessions.get('/githubcallback', passport.githubAuthentication_CB, sessionsController.githubLogin)
