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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoClient = new mongodb_1.MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
        const client = yield mongoClient.connect();
        console.log('Connected to DB'); // eslint-disable-line no-console
        const db = client.db(process.env.DB_NAME);
        return db;
    }
    catch (error) {
        console.error(`Error connecting to DB: ${error}`); // eslint-disable-line no-console
        throw error;
    }
});
exports.default = { init };
//# sourceMappingURL=db.js.map