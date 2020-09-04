require('dotenv').config();

const express = require('express');

const dbUtils = require('./utils/db');
const commonMiddleware = require('./middleware/common-middleware');
const errorHandlingMiddleware = require('./middleware/error-handling-middleware');

const App = (controllers, port) => {
  const app = express();

  const initMiddleware = () => {
    dbUtils
      .init(app)
      .then(dbInstance => {
        app.locals.db = dbInstance;
        // routes.init(app);
        commonMiddleware.init(app);
        errorHandlingMiddleware.init(app);
      })
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
  };

  const initControllers = () => {
    controllers.forEach(controller => {
      app.use('/', controller.router);
    });
  };

  const listen = () => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  };

  initMiddleware();
  initControllers();

  return Object.freeze({
    listen
  });
};

module.exports = App;
