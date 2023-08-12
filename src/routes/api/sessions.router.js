import { Router } from "express"
import * as sessionsController from "../../controllers/sessions.controller.js"
import  * as passport  from "../../middlewares/passport.js"


export const routerSessions = Router()

routerSessions.post('/register', passport.registerAuthentication, sessionsController.userRegister)


routerSessions.post('/login',passport.loginAuthentication, sessionsController.userLogin)

routerSessions.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (!err) res.send('Logout Ok!')
    else res.send({status: 'Logout Error', body: err})
  })
})


// routerSessions.get('/', (req, res, next) => {
//   if (req.session.counter) {
//     req.session.counter++
//     res.send(`the site was visited ${req.session.counter} times`)
//   } else {
//     req.session.counter = 1;
//     res.send(`Welcome!`)
//   }
// })
// routerSessions.get('/setCookie', (req, res, next) => {
//   const cookie = req.body
//   res.cookie('CutyCookie', 'value Of Cookie', { maxAge: 20000, signed: true }).send('Cookie')
// })
// routerSessions.get('/getCookie', (req, res, next) => {
//   console.log(req.cookies.CutyCookie)
//   res.send(req.signedCookies)
// })

// routerSessions.get('/deleteCookie', (req, res, next) => {
//   res.clearCookie('CutyCookie').send('Cookie Removed')
// })