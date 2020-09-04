const SongsService = db => {
  const getSongs = async () => {
    const songs = await db
      .collection('songs')
      .find()
      .toArray();
    return songs;
  };

  return Object.freeze({
    getSongs
  });
};

module.exports = SongsService;
