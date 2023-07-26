// import { Router } from "express";
import express from "express";
import { apiRouter } from "../routes/api/api.router.js";
import mongoose from "mongoose";

export const app = express()

app.use('/static', express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true})) // This line permmit that the server can interpret the best wall all of data that travel from URL and map it correctly in the req.query
mongoose.connect("mongodb://localhost:27017/ecommerce2");
app.use('/api', apiRouter)
