// import { Router } from "express";
import express from "express";
import { apiRouter } from "../routes/api/api.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { passportInitialize } from "../middlewares/passport.js";

export const app = express()

app.use('/static', express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // This line permmit that the server can interpret the best wall all of data that travel from URL and map it correctly in the req.query
app.use(cookieParser("S3CR3TC00k13"))
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

mongoose.connect("mongodb://localhost:27017/ecommerce2");

app.use('/api', apiRouter)
