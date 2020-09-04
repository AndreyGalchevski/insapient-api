const mongoose = require('mongoose');

const { Schema } = mongoose;

const MemberSchema = new Schema(
  {
    name: String,
    instrument: String,
    info: String,
    image: String
  },
  { collection: 'members' }
);

module.exports = mongoose.model('MemberModel', MemberSchema);
