const mongoose = require('mongoose');

const { Schema } = mongoose;

const LyricSchema = new Schema(
  {
    name: String,
    text: String
  },
  { collection: 'lyrics' }
);

module.exports = mongoose.model('LyricModel', LyricSchema);
