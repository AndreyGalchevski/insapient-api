import { Router } from 'express';

export type App = Readonly<{
  listen: () => void;
}>;

export type Controller = Readonly<{
  router: Router;
}>;
