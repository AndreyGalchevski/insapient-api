import { FilterQuery } from 'mongodb';

export interface City {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

export type CitiesService = Readonly<{
  getCities: (query: FilterQuery<City>) => Promise<City[]>;
}>;
