const LyricsService = db => {
  const getLyrics = async () => {
    const lyrics = await db
      .collection('lyrics')
      .find()
      .toArray();
    return lyrics;
  };

  return Object.freeze({
    getLyrics
  });
};

module.exports = LyricsService;
