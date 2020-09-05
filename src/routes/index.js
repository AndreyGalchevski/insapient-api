const CitiesController = require('./cities/cities-controller');
const CountriesController = require('./countries/countries-controller');
const GigsController = require('./gigs/gigs-controller');
const LyricsController = require('./lyrics/lyrics-controller');
const MembersController = require('./members/members-controller');
const MerchandisesController = require('./merchandises/merchandises-controller');
const OrdersController = require('./orders/orders-controller');
const SongsController = require('./songs/songs-controller');
const VideosController = require('./videos/videos-controller');

const init = app => {
  [
    CitiesController,
    CountriesController,
    GigsController,
    LyricsController,
    MembersController,
    MerchandisesController,
    OrdersController,
    SongsController,
    VideosController
  ].forEach(it => {
    app.use('/', it().router);
  });
};

module.exports = { init };
