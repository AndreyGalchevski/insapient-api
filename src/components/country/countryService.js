const CountryModel = require('./CountryModel');

const getCountries = async () => {
  try {
    const countries = await CountryModel.find().sort({ name: 1 });
    return countries;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCountries
};
