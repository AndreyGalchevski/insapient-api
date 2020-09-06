import { Router, Request, Response } from 'express';

import CountriesService from './countries-service';
import { Controller } from '../../types';

const CountriesController = (): Controller => {
  const path = '/countries';
  const router = Router();

  const getCountries = async (req: Request, res: Response) => {
    const countriesService = CountriesService(req.app.locals.db);
    const countries = await countriesService.getCountries();
    res.json({ data: countries });
  };

  router.get(path, getCountries);

  return Object.freeze({
    router,
  });
};

export default CountriesController;
