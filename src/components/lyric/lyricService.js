const LyricModel = require('./LyricModel');

const getLyrics = async () => {
  try {
    const lyrics = await LyricModel.find();
    return lyrics;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLyrics
};
