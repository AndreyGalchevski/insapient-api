import { Db } from 'mongodb';

import { Gig, GigsService } from './gigs-types';

const GigsService = (db: Db): GigsService => {
  const getGigs = async () => {
    const gigs = await db.collection<Gig>('gigs').find().toArray();
    return gigs;
  };

  return Object.freeze({
    getGigs,
  });
};

export default GigsService;
