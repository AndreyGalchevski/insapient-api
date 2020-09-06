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
const MerchandisesService = (db) => {
    const getMerchandises = () => __awaiter(void 0, void 0, void 0, function* () {
        const merchandises = yield db.collection('merches').find().toArray();
        return merchandises;
    });
    const getMerchandise = (merchandiseID) => __awaiter(void 0, void 0, void 0, function* () {
        const merchandise = yield db
            .collection('merches')
            .findOne({ _id: new mongodb_1.ObjectID(merchandiseID) });
        return merchandise;
    });
    const updateMerchandise = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedMerchandise = yield db
            .collection('merches')
            .findOneAndUpdate(query, { $set: data });
        return updatedMerchandise;
    });
    const updateStock = (merchandises) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Promise.all(merchandises.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const merchandise = yield getMerchandise(item.sku);
            if (item.size) {
                merchandise.stock.sizes[item.size] -= item.quantity;
            }
            merchandise.stock.total -= item.quantity;
            return updateMerchandise({ _id: item.sku }, merchandise);
        })));
        return result;
    });
    return Object.freeze({
        getMerchandises,
        getMerchandise,
        updateMerchandise,
        updateStock,
    });
};
exports.default = MerchandisesService;
//# sourceMappingURL=merchandises-service.js.map