import { Router, Request, Response } from 'express';

import { Controller } from '../../types';
import LyricsService from './lyrics-service';

const LyricsController = (): Controller => {
  const path = '/lyrics';
  const router = Router();

  const getLyrics = async (req: Request, res: Response) => {
    const lyricsService = LyricsService(req.app.locals.db);
    const lyrics = await lyricsService.getLyrics();
    res.json({ data: lyrics });
  };

  router.get(path, getLyrics);

  return Object.freeze({
    router,
  });
};

export default LyricsController;
