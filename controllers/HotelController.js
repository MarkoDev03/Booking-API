import Hotel from "../models/Hotel.js";
import City from "../models/City.js";
import errorProvider from "../provider/Provider.js";
import mongoose from "mongoose";

export const getHotels = async (req, res) => {
  try {
    let hotels = await Hotel.find();

    if (hotels.length === 0) {
      errorProvider(res, 404, "No hotels found!");
      return;
    }

    res.status(200).json(hotels);
  } catch (error) {
    errorProvider(res, 500, error.message);
  }
};

export const postHotel = async (req, res) => {
  try {
    let { name, photo, stars, city } = req.body;

    if (name.length === 0 && photo.length === 0) {
      errorProvider(res, 400, "All fields are rquired!");
      return;
    }

    stars = new Number(stars);

    if (stars > 5 || stars < 1) {
      errorProvider(res, 400, "Stars are invalid!");
      return;
    }

    if (name.length === 0 || photo.length === 0 || city.length === 0) {
        errorProvider(res, 400, "All fields is required!");
        return;
    }

    City.find({ name: city }, function (error, docs) {
      if (!docs.length) {
        errorProvider(res, 400, "City not found!");
        return;
      }

      if (error) {
        errorProvider(res, 400, error);
        return;
      }

      let cityData = docs[0]

        Hotel.find({ name: name, city: cityData }, function (error, docs) {
          if (!docs?.length) {
            let hotel = new Hotel({
              name,
              photo,
              stars,
              city: cityData,
            });

            let newHotel = hotel.save();

            res.setHeader("Content-Type", "application/json");
            res.status(200).json(newHotel);
          } else {
            errorProvider(res, 400, "This hotel already exists in this city! ");
            return;
          }

          if (error) {
            errorProvider(res, 400, error);
            return;
          }
        });
      
    });
  } catch (error) {
    errorProvider(res, 500, error.message);
  }
};

export const searchHotels = async (req, res) => {
    const { city } = req.query
    
    if (city.length === 0){
        errorProvider(res, 400, "City name is required!")
    }

    try {

        let cityData = await City.find({ name: city })

        if (cityData.length > 0) {
            let hotel = await Hotel.find({ city: cityData })
            res.status(200).json({ results: hotel, count: hotel.length })
        } 
    } catch (error) {
         errorProvider(res, 500, error.message);
    }
}