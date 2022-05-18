import { getHotels, postHotel, searchHotels } from "../controllers/HotelController.js";
import express from "express";

const Router = express.Router()

Router.get("/list", getHotels)

Router.post("/add-new", postHotel)
Router.get("/search", searchHotels)

export default Router