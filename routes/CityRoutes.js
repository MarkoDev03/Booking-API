import express from "express";
import { AddCity, getCities } from "../controllers/CityController.js";

const Router = express.Router()

Router.get("/list", getCities)

Router.post("/add-new", AddCity)

export default Router