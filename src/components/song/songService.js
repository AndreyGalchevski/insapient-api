const SongModel = require('./SongModel');

const getSongs = async () => {
  try {
    const songs = await SongModel.find();
    return songs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSongs
};
