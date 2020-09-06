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
const orders_service_1 = __importDefault(require("./orders-service"));
const OrdersController = () => {
    const path = '/orders';
    const router = express_1.Router();
    const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body) {
            return res.status(400).json({ error: 'Bad Request' });
        }
        const ordersService = orders_service_1.default(req.app.locals.db);
        const paymentPageUrl = yield ordersService.createOrder(req.body);
        if (!paymentPageUrl) {
            throw new Error('Error creating order');
        }
        else {
            return res.json({ data: paymentPageUrl });
        }
    });
    const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body) {
            return res.status(400).json({ error: 'Bad Request' });
        }
        const ordersService = orders_service_1.default(req.app.locals.db);
        const updatedOrder = yield ordersService.updateOrder(req.params.paymentID, req.body.payerID);
        if (!updatedOrder) {
            throw new Error('Error updating order');
        }
        else {
            return res.json({ data: updatedOrder });
        }
    });
    const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.token) {
            return res.status(400).json({ error: 'Bad Request' });
        }
        const ordersService = orders_service_1.default(req.app.locals.db);
        const deletedOrder = yield ordersService.deleteOrder({ token: req.params.token });
        if (!deletedOrder) {
            throw new Error('Error deleting order');
        }
        else {
            return res.json({ data: deletedOrder });
        }
    });
    router.post(path, createOrder);
    router.patch(`${path}/:paymentID`, updateOrder);
    router.delete(`${path}/:token`, deleteOrder);
    return Object.freeze({
        router,
    });
};
exports.default = OrdersController;
//# sourceMappingURL=orders-controller.js.map