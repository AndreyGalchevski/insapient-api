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
const videos_service_1 = __importDefault(require("./videos-service"));
const VideosController = () => {
    const path = '/videos';
    const router = express_1.Router();
    const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const videosService = videos_service_1.default(req.app.locals.db);
        const videos = yield videosService.getVideos();
        res.json({ data: videos });
    });
    router.get(path, getVideos);
    return Object.freeze({
        router,
    });
};
exports.default = VideosController;
//# sourceMappingURL=videos-controller.js.map