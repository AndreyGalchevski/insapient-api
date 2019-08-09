const lyricService = require('./lyricService');

const getLyrics = async (root, args, context, info) => {
  try {
    const lyrics = await lyricService.getLyrics();
    return lyrics;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLyrics
};
