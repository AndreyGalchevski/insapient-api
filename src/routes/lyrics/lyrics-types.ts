export interface Lyric {
  name: string;
  text: string;
}

export type LyricsService = Readonly<{
  getLyrics: () => Promise<Lyric[]>;
}>;
