import { Application, Request, Response, NextFunction, Errback } from 'express';
import createError from 'http-errors';

const init = (app: Application): void => {
  app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    console.log(err); // eslint-disable-line no-console
    next(createError(500, 'Something went terribly wrong'));
  });

  app.use((req, res, next) => {
    next(createError(404, 'Resource Not Found'));
  });
};

export default {
  init,
};
