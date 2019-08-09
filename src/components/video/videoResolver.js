const videoService = require('./videoService');

const getVideos = async (root, args, context, info) => {
  try {
    const videos = await videoService.getVideos();
    return videos;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVideos
};
