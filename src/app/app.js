// import { Router } from "express";
import express from "express";
import { apiRouter } from "../routes/api/api.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { passportInitialize } from "../middlewares/passport.js";
import handlebars from "express-handlebars";
import { routerLogin } from "../routes/views/login.routerview.js";
import { envConfig } from "../config/env.config.js";
import { cookieSecret } from "../config/cookies.config.js";
import { CNX_STR } from "../config/mongo.config.js";
import { addLogger, logger } from "../utils/logger.js";
import { responseMiddleware } from "../middlewares/responseMethods.js";

export const app = express();
console.log(envConfig.parsed);

app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This line permmit that the server can interpret the best wall all of data that travel from URL and map it correctly in the req.query
app.use(addLogger);
app.use(cookieParser(cookieSecret));
app.use(responseMiddleware);
app.use(passportInitialize);

mongoose
  .connect(CNX_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    logger.error("Error al conectar a la base de datos:", error);
  });
app.use("/static", express.static("public"));
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/api", apiRouter);
app.use("/", routerLogin);
app.get("*", (req, res, next) => {
  res.status(404).send("Unknown Route: " + req.url);
});
