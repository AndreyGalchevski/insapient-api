import { Router, Request, Response } from 'express';

import { Controller } from '../../types';
import MembersService from './members-service';

const MembersController = (): Controller => {
  const path = '/members';
  const router = Router();

  const getMembers = async (req: Request, res: Response) => {
    const memberService = MembersService(req.app.locals.db);
    const members = await memberService.getMembers();
    res.json({ data: members });
  };

  router.get(path, getMembers);

  return Object.freeze({
    router,
  });
};

export default MembersController;
