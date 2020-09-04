const { Router } = require('express');
const CitiesService = require('./cities-service');

const CitiesController = () => {
  const path = '/cities';
  const router = Router();

  const getCities = async (req, res) => {
    const citiesService = CitiesService(req.app.locals.db);
    const cities = await citiesService.getCities({
      country: req.query.country
    });
    res.json({ data: cities });
  };

  router.get(path, getCities);

  return Object.freeze({
    router
  });
};

module.exports = CitiesController;
