const CitiesService = db => {
  const getCities = async query => {
    const cities = await db
      .collection('cities')
      .find(query, { sort: [['name', 1]] })
      .toArray();
    return cities;
  };

  return Object.freeze({
    getCities
  });
};

module.exports = CitiesService;
