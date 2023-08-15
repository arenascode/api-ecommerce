// import { Router } from "express";
import express from "express";
import { apiRouter } from "../routes/api/api.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { passportInitialize } from "../middlewares/passport.js";
import handlebars from "express-handlebars";
import { routerLogin } from "../routes/views/login.routerview.js";
import { envConfig } from "../config/env.config.js";
import { cookieSecret } from "../config/cookies.config.js";
import { CNX_STR } from "../config/mongo.config.js";

export const app = express()
console.log(envConfig.parsed)

app.use('/static', express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // This line permmit that the server can interpret the best wall all of data that travel from URL and map it correctly in the req.query
app.use(cookieParser(cookieSecret))
app.use(passportInitialize)
// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: "mongodb://localhost:27017/ecommerce2",
//       mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true}
//     }),
//     secret: "s3cr3tS3ssi0n",
//     resave: true,
//     saveUninitialized: false,
//   })
// );
mongoose.connect(CNX_STR);
app.use('/static', express.static('public'))
app.engine('handlebars', handlebars.engine());
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/api', apiRouter)
app.use('/', routerLogin)
app.get("*", (req, res, next) => {
  res.status(404).send("Unknown Route: " + req.url);
});

