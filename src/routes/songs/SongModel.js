const mongoose = require('mongoose');

const { Schema } = mongoose;

const SongSchema = new Schema(
  {
    name: String,
    url: String
  },
  {
    collection: 'songs'
  }
);

module.exports = mongoose.model('SongModel', SongSchema);
