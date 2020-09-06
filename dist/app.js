"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./utils/db"));
const common_middleware_1 = __importDefault(require("./middleware/common-middleware"));
const error_handling_middleware_1 = __importDefault(require("./middleware/error-handling-middleware"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.config();
const App = (port) => {
    const app = express_1.default();
    db_1.default
        .init()
        .then((dbInstance) => {
        app.locals.db = dbInstance;
        common_middleware_1.default.init(app);
        routes_1.default.init(app);
        error_handling_middleware_1.default.init(app);
    })
        .catch((error) => {
        console.error(error); // eslint-disable-line no-console
        process.exit(1);
    });
    const listen = () => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`); // eslint-disable-line no-console
        });
    };
    return Object.freeze({
        listen,
    });
};
exports.default = App;
//# sourceMappingURL=app.js.map