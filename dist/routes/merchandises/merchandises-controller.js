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
const merchandises_service_1 = __importDefault(require("./merchandises-service"));
const MembersController = () => {
    const path = '/merchandises';
    const router = express_1.Router();
    const getMerchandises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const merchandisesService = merchandises_service_1.default(req.app.locals.db);
        const merchandises = yield merchandisesService.getMerchandises();
        res.json({ data: merchandises });
    });
    const getMerchandise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const merchandisesService = merchandises_service_1.default(req.app.locals.db);
        const merchandise = yield merchandisesService.getMerchandise(req.params.merchandiseID);
        res.json({ data: merchandise });
    });
    router.get(path, getMerchandises);
    router.get(`${path}/:merchandiseID`, getMerchandise);
    return Object.freeze({
        router,
    });
};
exports.default = MembersController;
//# sourceMappingURL=merchandises-controller.js.map