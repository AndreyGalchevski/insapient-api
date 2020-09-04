const { Router } = require('express');
const CountriesService = require('./countries-service');

const CountriesController = () => {
  const path = '/countries';
  const router = Router();

  const getCountries = async (req, res) => {
    const countriesService = CountriesService(req.app.locals.db);
    const countries = await countriesService.getCountries();
    res.json({ data: countries });
  };

  router.get(path, getCountries);

  return Object.freeze({
    router
  });
};

module.exports = CountriesController;
