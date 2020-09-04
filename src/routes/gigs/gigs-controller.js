const { Router } = require('express');
const GigsService = require('./gigs-service');

const GigsController = () => {
  const path = '/gigs';
  const router = Router();

  const getGigs = async (req, res) => {
    const gigsService = GigsService(req.app.locals.db);
    const gigs = await gigsService.getGigs();
    res.json({ data: gigs });
  };

  router.get(path, getGigs);

  return Object.freeze({
    router
  });
};

module.exports = GigsController;
