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
const cities_service_1 = __importDefault(require("./cities-service"));
const CitiesController = () => {
    const path = '/cities';
    const router = express_1.Router();
    const getCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const citiesService = cities_service_1.default(req.app.locals.db);
        const cities = yield citiesService.getCities({
            country: req.query.country,
        });
        res.json({ data: cities });
    });
    router.get(path, getCities);
    return Object.freeze({
        router,
    });
};
exports.default = CitiesController;
//# sourceMappingURL=cities-controller.js.map