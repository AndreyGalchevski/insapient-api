const { Router } = require('express');
const SongsService = require('./songs-service');

const SongsController = () => {
  const path = '/songs';
  const router = Router();

  const getSongs = async (req, res) => {
    const songsService = SongsService(req.app.locals.db);
    const songs = await songsService.getSongs();
    res.json({ data: songs });
  };

  router.get(path, getSongs);

  return Object.freeze({
    router
  });
};

module.exports = SongsController;
