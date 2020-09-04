const mongoose = require('mongoose');

const { Schema } = mongoose;

const CountrySchema = new Schema(
  {
    code: String,
    name: String
  },
  { collection: 'countries' }
);

module.exports = mongoose.model('CountryModel', CountrySchema);
