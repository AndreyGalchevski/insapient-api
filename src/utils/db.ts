import { MongoClient, Db } from 'mongodb';

const init = async (): Promise<Db> => {
  try {
    const mongoClient = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
    const client = await mongoClient.connect();
    console.log('Connected to DB'); // eslint-disable-line no-console
    const db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.error(`Error connecting to DB: ${error}`); // eslint-disable-line no-console
    throw error;
  }
};

export default { init };
