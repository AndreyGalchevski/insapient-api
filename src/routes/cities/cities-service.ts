import { Db, FilterQuery } from 'mongodb';

import { City, CitiesService } from './cities-types';

const CitiesService = (db: Db): CitiesService => {
  const getCities = async (query: FilterQuery<City>) => {
    const cities = await db
      .collection<City>('cities')
      .find(query, { sort: [['name', 1]] })
      .toArray();
    return cities;
  };

  return Object.freeze({
    getCities,
  });
};

export default CitiesService;
