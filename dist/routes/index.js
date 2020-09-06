"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cities_controller_1 = __importDefault(require("./cities/cities-controller"));
const countries_controller_1 = __importDefault(require("./countries/countries-controller"));
const gigs_controller_1 = __importDefault(require("./gigs/gigs-controller"));
const lyrics_controller_1 = __importDefault(require("./lyrics/lyrics-controller"));
const members_controller_1 = __importDefault(require("./members/members-controller"));
const merchandises_controller_1 = __importDefault(require("./merchandises/merchandises-controller"));
const orders_controller_1 = __importDefault(require("./orders/orders-controller"));
const songs_controller_1 = __importDefault(require("./songs/songs-controller"));
const videos_controller_1 = __importDefault(require("./videos/videos-controller"));
const init = (app) => {
    [
        cities_controller_1.default,
        countries_controller_1.default,
        gigs_controller_1.default,
        lyrics_controller_1.default,
        members_controller_1.default,
        merchandises_controller_1.default,
        orders_controller_1.default,
        songs_controller_1.default,
        videos_controller_1.default,
    ].forEach((it) => {
        app.use('/', it().router);
    });
};
exports.default = { init };
//# sourceMappingURL=index.js.map