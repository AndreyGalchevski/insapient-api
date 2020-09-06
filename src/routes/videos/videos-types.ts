export interface Video {
  name: string;
  url: string;
  date: Date;
}

export type VideosService = Readonly<{
  getVideos: () => Promise<Video[]>;
}>;
