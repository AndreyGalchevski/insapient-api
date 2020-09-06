export interface Gig {
  venue: string;
  address: string;
  date: string;
  hour: string;
  fbEvent: string;
  image: string;
}

export type GigsService = Readonly<{
  getGigs: () => Promise<Gig[]>;
}>;
