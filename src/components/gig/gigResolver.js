const gigService = require('./gigService');

const getGigs = async (root, args, context, info) => {
  try {
    const gigs = await gigService.getGigs();
    return gigs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGigs
};
