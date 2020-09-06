import { Db } from 'mongodb';

import { Video, VideosService } from './videos-types';

const VideosService = (db: Db): VideosService => {
  const getVideos = async () => {
    const videos = await db.collection<Video>('videos').find().toArray();
    return videos;
  };

  return Object.freeze({
    getVideos,
  });
};

export default VideosService;
