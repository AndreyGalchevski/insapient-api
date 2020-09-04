const { Router } = require('express');
const VideosService = require('./videos-service');

const VideosController = () => {
  const path = '/videos';
  const router = Router();

  const getVideos = async (req, res) => {
    const videosService = VideosService(req.app.locals.db);
    const videos = await videosService.getVideos();
    res.json({ data: videos });
  };

  router.get(path, getVideos);

  return Object.freeze({
    router
  });
};

module.exports = VideosController;
