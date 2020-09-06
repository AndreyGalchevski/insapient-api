import { config } from 'dotenv';

import express from 'express';

import { App } from './types';
import dbUtils from './utils/db';
import commonMiddleware from './middleware/common-middleware';
import errorHandlingMiddleware from './middleware/error-handling-middleware';
import routes from './routes';

config();

const App = (port: number): App => {
  const app = express();

  dbUtils
    .init()
    .then((dbInstance) => {
      app.locals.db = dbInstance;
      commonMiddleware.init(app);
      routes.init(app);
      errorHandlingMiddleware.init(app);
    })
    .catch((error) => {
      console.error(error); // eslint-disable-line no-console
      process.exit(1);
    });

  const listen = () => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`); // eslint-disable-line no-console
    });
  };

  return Object.freeze({
    listen,
  });
};

export default App;
