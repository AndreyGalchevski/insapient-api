const CityModel = require('./CityModel');

const getCities = async filter => {
  try {
    const cities = await CityModel.find(filter).sort({ name: 1 });
    return cities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCities
};
