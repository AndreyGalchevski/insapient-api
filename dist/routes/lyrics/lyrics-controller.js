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
const lyrics_service_1 = __importDefault(require("./lyrics-service"));
const LyricsController = () => {
    const path = '/lyrics';
    const router = express_1.Router();
    const getLyrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lyricsService = lyrics_service_1.default(req.app.locals.db);
        const lyrics = yield lyricsService.getLyrics();
        res.json({ data: lyrics });
    });
    router.get(path, getLyrics);
    return Object.freeze({
        router,
    });
};
exports.default = LyricsController;
//# sourceMappingURL=lyrics-controller.js.map