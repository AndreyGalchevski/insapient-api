export interface Country {
  code: string;
  name: string;
}

export type CountriesService = Readonly<{
  getCountries: () => Promise<Country[]>;
}>;
