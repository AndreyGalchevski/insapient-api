const memberService = require('./memberService');

const getMembers = async (root, args, context, info) => {
  try {
    const members = await memberService.getMembers();
    return members;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMembers
};
