const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const init = app => {
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN,
      optionsSuccessStatus: 200
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
};

module.exports = {
  init
};
