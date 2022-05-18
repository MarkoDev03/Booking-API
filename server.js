import express from "express";
import HTTP from "http"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import HotelRoutes from "./routes/HotelRoutes.js"
import CityRoutes from "./routes/CityRoutes.js"

const application = express()
const httpServer = HTTP.createServer(application)

dotenv.config()
application.use(bodyParser.json())
application.use(express.json())

application.use("/api/v3/hotels", HotelRoutes)
application.use("/api/v3/city", CityRoutes)

application.get("/", (req, res) => {
    res.send("Hello")
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
   mongoose.connect(process.env.CONNECTION_URI, {})
   .then(() => {
     console.log(PORT)
   })
   .catch((error) => {
       console.log(error)
   })
})