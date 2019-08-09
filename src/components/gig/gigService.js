const GigModel = require('./GigModel');

const getGigs = async () => {
  try {
    const gigs = await GigModel.find();
    return gigs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGigs
};
