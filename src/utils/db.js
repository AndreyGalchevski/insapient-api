const { MongoClient } = require('mongodb');

const init = async () => {
  try {
    const mongoClient = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
    const client = await mongoClient.connect();
    console.log('Connected to DB');
    const db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.error(`Error connecting to DB: ${error}`);
    throw error;
  }
};

module.exports = { init };
