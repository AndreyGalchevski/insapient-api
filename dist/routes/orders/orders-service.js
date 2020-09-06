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
const mongodb_1 = require("mongodb");
const merchandises_service_1 = __importDefault(require("../merchandises/merchandises-service"));
const paypal_1 = __importDefault(require("../../utils/paypal"));
const mailer_1 = __importDefault(require("../../utils/mailer"));
const OrdersService = (db) => {
    const SHIPPING_COST = 10;
    const verifyPrices = (order) => __awaiter(void 0, void 0, void 0, function* () {
        const verifiedOrder = JSON.parse(JSON.stringify(order));
        const merchandisesService = merchandises_service_1.default(db);
        verifiedOrder.transaction.item_list.items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const merchandise = yield merchandisesService.getMerchandise(item.sku);
            item.price = merchandise.price; // eslint-disable-line no-param-reassign
            item.currency = 'USD'; // eslint-disable-line no-param-reassign
        }));
        const verifiedTotal = verifiedOrder.transaction.item_list.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        verifiedOrder.transaction.amount = {
            total: verifiedTotal + SHIPPING_COST,
            currency: 'USD',
            details: {
                subtotal: verifiedTotal,
                shipping: SHIPPING_COST,
            },
        };
        return verifiedOrder;
    });
    const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const verifiedOrder = yield verifyPrices(data);
        const paypalOrder = JSON.parse(JSON.stringify(verifiedOrder));
        paypalOrder.transaction.item_list.items.forEach((item) => {
            if (item.size || item.size === '') {
                delete item.size; // eslint-disable-line no-param-reassign
            }
        });
        const { paymentId, token, paymentPageUrl } = yield paypal_1.default.pay(paypalOrder.transaction);
        verifiedOrder.paymentId = paymentId;
        verifiedOrder.token = token;
        yield db.collection('orders').insertOne(verifiedOrder);
        return paymentPageUrl;
    });
    const updateOrder = (paymentID, payerID) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield db.collection('orders').findOne({ paymentId: paymentID });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const paymentResponse = yield paypal_1.default.execute(payerID, paymentID, order.transaction.amount);
        if (paymentResponse.state === 'approved') {
            const merchandisesService = merchandises_service_1.default(db);
            yield merchandisesService.updateStock(order.transaction.item_list.items);
            mailer_1.default.sendShippingInformation(order);
            mailer_1.default.sendPaymentConfirmation(order);
            const updatedOrder = yield db
                .collection('orders')
                .findOneAndUpdate({ _id: new mongodb_1.ObjectID(order._id) }, { $set: { status: 'paid' } });
            return updatedOrder;
        }
        return null;
    });
    const deleteOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedOrder = yield db.collection('orders').findOneAndDelete(query);
        return deletedOrder;
    });
    return Object.freeze({
        createOrder,
        updateOrder,
        deleteOrder,
    });
};
exports.default = OrdersService;
//# sourceMappingURL=orders-service.js.map