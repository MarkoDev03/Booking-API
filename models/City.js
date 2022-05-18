import mongoose from "mongoose";

const cityModel = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    country: {
        type: String,
        required: false,
        unique: false
    }
})

const City = mongoose.model("City", cityModel)
export default City