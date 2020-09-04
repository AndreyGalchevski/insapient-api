const GigsService = db => {
  const getGigs = async () => {
    const gigs = await db
      .collection('gigs')
      .find()
      .toArray();
    return gigs;
  };

  return Object.freeze({
    getGigs
  });
};

module.exports = GigsService;
