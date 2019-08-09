const cityService = require('./cityService');

const getCities = async (root, args, context, info) => {
  try {
    const cities = await cityService.getCities({ country: args.country });
    return cities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCities
};
