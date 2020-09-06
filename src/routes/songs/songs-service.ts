import { Db } from 'mongodb';

import { Song, SongsService } from './songs-types';

const SongsService = (db: Db): SongsService => {
  const getSongs = async () => {
    const songs = await db.collection<Song>('songs').find().toArray();
    return songs;
  };

  return Object.freeze({
    getSongs,
  });
};

export default SongsService;
