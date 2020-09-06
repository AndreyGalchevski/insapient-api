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
const gigs_service_1 = __importDefault(require("./gigs-service"));
const GigsController = () => {
    const path = '/gigs';
    const router = express_1.Router();
    const getGigs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const gigsService = gigs_service_1.default(req.app.locals.db);
        const gigs = yield gigsService.getGigs();
        res.json({ data: gigs });
    });
    router.get(path, getGigs);
    return Object.freeze({
        router,
    });
};
exports.default = GigsController;
//# sourceMappingURL=gigs-controller.js.map