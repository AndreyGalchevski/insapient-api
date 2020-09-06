import { Db } from 'mongodb';

import { Member, MembersService } from './members-types';

const MembersService = (db: Db): MembersService => {
  const getMembers = async () => {
    const members = await db.collection<Member>('members').find().toArray();
    return members;
  };

  return Object.freeze({
    getMembers,
  });
};

export default MembersService;
