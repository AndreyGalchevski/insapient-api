const MembersService = db => {
  const getMembers = async () => {
    const members = await db
      .collection('members')
      .find()
      .toArray();
    return members;
  };

  return Object.freeze({
    getMembers
  });
};

module.exports = MembersService;
