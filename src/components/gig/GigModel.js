const mongoose = require('mongoose');

const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    venue: String,
    address: String,
    date: String,
    hour: String,
    fbEvent: String,
    image: String
  },
  { collection: 'gigs' }
);

module.exports = mongoose.model('GigModel', GigSchema);
