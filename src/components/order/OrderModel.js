const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    paymentId: { type: String, required: true },
    token: { type: String, required: true },
    status: { type: String, default: 'created' },
    date: { type: Date, default: new Date() },
    transaction: {
      item_list: {
        items: [
          {
            name: String,
            sku: String,
            price: Number,
            size: String,
            currency: { type: String, default: 'USD' },
            quantity: Number
          }
        ]
      },
      amount: {
        details: {
          subtotal: Number,
          shipping: Number
        },
        currency: { type: String, default: 'USD' },
        total: Number
      },
      description: String
    },
    customerInfo: {
      fullName: String,
      email: String,
      country: String,
      city: String,
      address: String,
      zipCode: String,
      cellphone: String
    }
  },
  { collection: 'orders' }
);

module.exports = mongoose.model('OrderModel', OrderSchema);
