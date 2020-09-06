"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const init = (app) => {
    app.use((err, req, res, next) => {
        console.log(err); // eslint-disable-line no-console
        next(http_errors_1.default(500, 'Something went terribly wrong'));
    });
    app.use((req, res, next) => {
        next(http_errors_1.default(404, 'Resource Not Found'));
    });
};
exports.default = {
    init,
};
//# sourceMappingURL=error-handling-middleware.js.map