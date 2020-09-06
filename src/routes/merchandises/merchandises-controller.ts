import { Router, Request, Response } from 'express';

import MerchandisesService from './merchandises-service';
import { Controller } from '../../types';

const MembersController = (): Controller => {
  const path = '/merchandises';
  const router = Router();

  const getMerchandises = async (req: Request, res: Response) => {
    const merchandisesService = MerchandisesService(req.app.locals.db);
    const merchandises = await merchandisesService.getMerchandises();
    res.json({ data: merchandises });
  };

  const getMerchandise = async (req: Request, res: Response) => {
    const merchandisesService = MerchandisesService(req.app.locals.db);
    const merchandise = await merchandisesService.getMerchandise(req.params.merchandiseID);
    res.json({ data: merchandise });
  };

  router.get(path, getMerchandises);
  router.get(`${path}/:merchandiseID`, getMerchandise);

  return Object.freeze({
    router,
  });
};

export default MembersController;
