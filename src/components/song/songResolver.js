const songService = require('./songService');

const getSongs = async (root, args, context, info) => {
  try {
    const songs = await songService.getSongs();
    return songs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSongs
};
