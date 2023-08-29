import { Router } from "express";
import { decodeToken } from "../../utils/cryptography.js";

export const routerView = Router()
// Login view
routerView.get('/login', (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login'
  })
})

//send mail to restore password view
routerView.get('/restorePassword/sendMail',(req, res, next) => {
  res.render("sendMail", {
    pageTitle: "SendMailToRestorePassword",
  });
})

routerView.get('/restorePassword/newPass/', async (req, res, next) => {
  const userData = {
    id: req.query.id,
    token: req.query.token
  }
  console.log(req.query);
  const isTokenExpired = await decodeToken(userData.token)
  if (!isTokenExpired) {
    res['sendAuthError']('The time to restore your password expired.Please send us an email again')
  }
  res.render('restorePassword',{
    pageTitle: 'New Password',
    user: userData
  })
 })