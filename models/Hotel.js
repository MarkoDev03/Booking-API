import mongoose from "mongoose";

const hotelModel = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    photo: {
        type: String,
        unique: false,
        required: true
    },
    stars: {
        type: Number,
        unique: false,
        required: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        unique: false,
        required: true,
        ref: "City"
    }
})

const Hotel = mongoose.model("Hotel", hotelModel)

export default Hotel