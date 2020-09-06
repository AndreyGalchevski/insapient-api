import { Router, Request, Response } from 'express';

import VideosService from './videos-service';
import { Controller } from '../../types';

const VideosController = (): Controller => {
  const path = '/videos';
  const router = Router();

  const getVideos = async (req: Request, res: Response) => {
    const videosService = VideosService(req.app.locals.db);
    const videos = await videosService.getVideos();
    res.json({ data: videos });
  };

  router.get(path, getVideos);

  return Object.freeze({
    router,
  });
};

export default VideosController;
