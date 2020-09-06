import helmet from 'helmet';
import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const init = (app: Application): void => {
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
};

export default {
  init,
};
