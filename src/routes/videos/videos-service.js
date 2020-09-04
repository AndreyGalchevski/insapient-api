const VideosService = db => {
  const getVideos = async () => {
    const videos = await db
      .collection('videos')
      .find()
      .toArray();
    return videos;
  };

  return Object.freeze({
    getVideos
  });
};

module.exports = VideosService;
