const MemberModel = require('./MemberModel');

const getMembers = async () => {
  try {
    const members = await MemberModel.find();
    return members;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMembers
};
