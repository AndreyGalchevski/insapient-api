const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('Connected to DB');
  } catch (error) {
    console.error(`Error connecting to DB: ${error}`);
  }
};

module.exports = { connect };
