import { Db } from 'mongodb';

import { Lyric, LyricsService } from './lyrics-types';

const LyricsService = (db: Db): LyricsService => {
  const getLyrics = async () => {
    const lyrics = await db.collection<Lyric>('lyrics').find().toArray();
    return lyrics;
  };

  return Object.freeze({
    getLyrics,
  });
};

export default LyricsService;
