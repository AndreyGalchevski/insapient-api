import { Router, Request, Response } from 'express';

import SongsService from './songs-service';
import { Controller } from '../../types';

const SongsController = (): Controller => {
  const path = '/songs';
  const router = Router();

  const getSongs = async (req: Request, res: Response) => {
    const songsService = SongsService(req.app.locals.db);
    const songs = await songsService.getSongs();
    res.json({ data: songs });
  };

  router.get(path, getSongs);

  return Object.freeze({
    router,
  });
};

export default SongsController;
