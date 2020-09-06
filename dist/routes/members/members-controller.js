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
const members_service_1 = __importDefault(require("./members-service"));
const MembersController = () => {
    const path = '/members';
    const router = express_1.Router();
    const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const memberService = members_service_1.default(req.app.locals.db);
        const members = yield memberService.getMembers();
        res.json({ data: members });
    });
    router.get(path, getMembers);
    return Object.freeze({
        router,
    });
};
exports.default = MembersController;
//# sourceMappingURL=members-controller.js.map