const countryService = require('./countryService');

const getCountries = async (root, args, context, info) => {
  try {
    const countries = await countryService.getCountries();
    return countries;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCountries
};
