"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songs_service_1 = __importDefault(require("./songs-service"));
const SongsController = () => {
    const path = '/songs';
    const router = express_1.Router();
    const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const songsService = songs_service_1.default(req.app.locals.db);
        const songs = yield songsService.getSongs();
        res.json({ data: songs });
    });
    router.get(path, getSongs);
    return Object.freeze({
        router,
    });
};
exports.default = SongsController;
//# sourceMappingURL=songs-controller.js.map