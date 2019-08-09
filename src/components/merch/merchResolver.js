const merchService = require('./merchService');

const getMerches = async (root, args, context, info) => {
  try {
    const merches = await merchService.getMerches();
    return merches;
  } catch (error) {
    throw error;
  }
};

const getMerch = async (root, args, context, info) => {
  try {
    const merch = await merchService.getMerch(args.merchId);
    return merch;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMerches,
  getMerch
};
