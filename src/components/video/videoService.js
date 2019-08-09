const VideoModel = require('./VideoModel');

const getVideos = async () => {
  try {
    const videos = await VideoModel.find({}).sort({ date: -1 });
    return videos;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVideos
};
