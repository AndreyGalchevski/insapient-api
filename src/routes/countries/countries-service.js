const CountriesService = db => {
  const getCountries = async () => {
    const countries = await db
      .collection('cities')
      .find({}, { sort: [['name', 1]] })
      .toArray();
    return countries;
  };

  return Object.freeze({
    getCountries
  });
};

module.exports = CountriesService;
