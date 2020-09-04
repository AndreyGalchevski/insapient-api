const { Router } = require('express');
const MembersService = require('./members-service');

const MembersController = () => {
  const path = '/members';
  const router = Router();

  const getMembers = async (req, res) => {
    const memberService = MembersService(req.app.locals.db);
    const members = await memberService.getMembers();
    res.json({ data: members });
  };

  router.get(path, getMembers);

  return Object.freeze({
    router
  });
};

module.exports = MembersController;
