import { Db } from 'mongodb';

import { Country, CountriesService } from './countries-types';

const CountriesService = (db: Db): CountriesService => {
  const getCountries = async () => {
    const countries = await db
      .collection<Country>('countries')
      .find({}, { sort: [['name', 1]] })
      .toArray();
    return countries;
  };

  return Object.freeze({
    getCountries,
  });
};

export default CountriesService;
