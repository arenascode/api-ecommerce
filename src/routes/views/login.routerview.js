import { Router } from "express";

export const routerLogin = Router()

routerLogin.get('/login', (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login'
  })
})

