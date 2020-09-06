export interface Song {
  name: string;
  url: string;
}

export type SongsService = Readonly<{
  getSongs: () => Promise<Song[]>;
}>;
