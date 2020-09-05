require('dotenv').config();

const express = require('express');

const dbUtils = require('./utils/db');
const commonMiddleware = require('./middleware/common-middleware');
const errorHandlingMiddleware = require('./middleware/error-handling-middleware');
const routes = require('./routes');

const App = port => {
  const app = express();

  dbUtils
    .init(app)
    .then(dbInstance => {
      app.locals.db = dbInstance;
      commonMiddleware.init(app);
      routes.init(app);
      errorHandlingMiddleware.init(app);
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

  const listen = () => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  };

  return Object.freeze({
    listen
  });
};

module.exports = App;
