const App = require('./app');
const CitiesController = require('./routes/cities/cities-controller');
const CountriesController = require('./routes/countries/countries-controller');
const GigsController = require('./routes/gigs/gigs-controller');
const LyricsController = require('./routes/lyrics/lyrics-controller');
const MembersController = require('./routes/members/members-controller');
const MerchandisesController = require('./routes/merchandises/merchandises-controller');
const OrdersController = require('./routes/orders/orders-controller');
const SongsController = require('./routes/songs/songs-controller');
const VideosController = require('./routes/videos/videos-controller');

const app = App(
  [
    CitiesController(),
    CountriesController(),
    GigsController(),
    LyricsController(),
    MembersController(),
    MerchandisesController(),
    OrdersController(),
    SongsController(),
    VideosController()
  ],
  process.env.PORT || 8080
);

app.listen();
