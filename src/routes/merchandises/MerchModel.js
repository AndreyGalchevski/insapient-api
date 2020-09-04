const mongoose = require('mongoose');

const { Schema } = mongoose;

const MerchSchema = new Schema(
  {
    name: String,
    type: String,
    price: Number,
    image: String,
    description: String,
    stock: {
      sizes: {
        XS: Number,
        S: Number,
        M: Number,
        L: Number,
        XL: Number,
        XXL: Number
      },
      total: Number
    }
  },
  { collection: 'merches' }
);

module.exports = mongoose.model('MerchModel', MerchSchema);
