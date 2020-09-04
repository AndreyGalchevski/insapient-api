const mongoose = require('mongoose');

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    name: String,
    url: String,
    date: Date
  },
  {
    collection: 'videos'
  }
);

module.exports = mongoose.model('VideoModel', VideoSchema);
