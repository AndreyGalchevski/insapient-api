const { Router } = require('express');
const LyricsService = require('./lyrics-service');

const LyricsController = () => {
  const path = '/lyrics';
  const router = Router();

  const getLyrics = async (req, res) => {
    const lyricsService = LyricsService(req.app.locals.db);
    const lyrics = await lyricsService.getLyrics();
    res.json({ data: lyrics });
  };

  router.get(path, getLyrics);

  return Object.freeze({
    router
  });
};

module.exports = LyricsController;
