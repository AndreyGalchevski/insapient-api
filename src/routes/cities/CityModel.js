const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema(
  {
    country: String,
    name: String,
    lat: String,
    lng: String
  },
  { collection: 'cities' }
);

module.exports = mongoose.model('CityModel', CitySchema);
