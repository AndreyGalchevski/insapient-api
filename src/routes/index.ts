import { Application } from 'express';

import CitiesController from './cities/cities-controller';
import CountriesController from './countries/countries-controller';
import GigsController from './gigs/gigs-controller';
import LyricsController from './lyrics/lyrics-controller';
import MembersController from './members/members-controller';
import MerchandisesController from './merchandises/merchandises-controller';
import OrdersController from './orders/orders-controller';
import SongsController from './songs/songs-controller';
import VideosController from './videos/videos-controller';

const init = (app: Application): void => {
  [
    CitiesController,
    CountriesController,
    GigsController,
    LyricsController,
    MembersController,
    MerchandisesController,
    OrdersController,
    SongsController,
    VideosController,
  ].forEach((it) => {
    app.use('/', it().router);
  });
};

export default { init };
