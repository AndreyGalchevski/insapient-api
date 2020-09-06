"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const init = (app) => {
    app.use(helmet_1.default());
    app.use(cors_1.default({
        origin: process.env.ALLOWED_ORIGIN,
        optionsSuccessStatus: 200,
    }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(morgan_1.default('tiny'));
};
exports.default = {
    init,
};
//# sourceMappingURL=common-middleware.js.map