import { Router, Request, Response } from 'express';

import { Controller } from '../../types';
import CitiesService from './cities-service';

const CitiesController = (): Controller => {
  const path = '/cities';
  const router = Router();

  const getCities = async (req: Request, res: Response) => {
    const citiesService = CitiesService(req.app.locals.db);
    const cities = await citiesService.getCities({
      country: req.query.country as string,
    });
    res.json({ data: cities });
  };

  router.get(path, getCities);

  return Object.freeze({
    router,
  });
};

export default CitiesController;
