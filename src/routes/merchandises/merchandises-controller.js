const { Router } = require('express');
const MerchandisesService = require('./merchandises-service');

const MembersController = () => {
  const path = '/merchandises';
  const router = Router();

  const getMerchandises = async (req, res) => {
    const merchandisesService = MerchandisesService(req.app.locals.db);
    const merchandises = await merchandisesService.getMerchandises();
    res.json({ data: merchandises });
  };

  const getMerchandise = async (req, res) => {
    const merchandisesService = MerchandisesService(req.app.locals.db);
    const merchandise = await merchandisesService.getMerchandise(req.params.merchandiseID);
    res.json({ data: merchandise });
  };

  router.get(path, getMerchandises);
  router.get(`${path}/:merchandiseID`, getMerchandise);

  return Object.freeze({
    router
  });
};

module.exports = MembersController;
