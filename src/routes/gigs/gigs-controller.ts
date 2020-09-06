import { Router, Request, Response } from 'express';

import { Controller } from '../../types';
import GigsService from './gigs-service';

const GigsController = (): Controller => {
  const path = '/gigs';
  const router = Router();

  const getGigs = async (req: Request, res: Response) => {
    const gigsService = GigsService(req.app.locals.db);
    const gigs = await gigsService.getGigs();
    res.json({ data: gigs });
  };

  router.get(path, getGigs);

  return Object.freeze({
    router,
  });
};

export default GigsController;
