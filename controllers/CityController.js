import City from "../models/City.js";
import errorProvider from "../provider/Provider.js";

export const AddCity = async (req, res) => {
  const { name, country } = req.body;

  if (country.length === 0) {
    errorProvider(res, 500, "City name is not valid");
  }

  if (country.length === 0) {
    errorProvider(res, 500, "Country name is not valid");
  }

  let cities = await City.find({ name: name, country: country });

  try {
    if (cities.length == 0) {
      let city = new City({ name: name, country: country });
      let newCity = await city.save();

      res.status(200).json(newCity);
    } else  {
        errorProvider(res, 400, "This city is already added in " + country);
    }

  } catch (error) {
    errorProvider(res, 500, error.message);
  }
};

export const getCities = async (req, res) => {
  try {
      let cities = await City.find()

      if (cities.length === 0) {
        errorProvider(res, 404, "No cities found!")
        return;
      }

      res.setHeader("Content-Type", "application/json")
      res.status(200).json(cities)
  } catch (error) {
    errorProvider(res, 500, error.message);
  }
}

export const GetAllCities = async (req, res) => {}