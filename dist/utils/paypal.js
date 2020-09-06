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
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const query_string_1 = __importDefault(require("query-string"));
paypal_rest_sdk_1.default.configure({
    mode: process.env.PAYPAL_MODE || 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});
const createPay = (paymentInfo) => {
    return new Promise((resolve, reject) => {
        paypal_rest_sdk_1.default.payment.create(paymentInfo, (err, payment) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payment);
            }
        });
    });
};
const pay = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentInfo = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: process.env.PAYPAL_RETURN_URL,
            cancel_url: process.env.PAYPAL_CANCEL_URL,
        },
        transactions: [transaction],
    };
    try {
        const res = yield createPay(paymentInfo);
        const { id, links } = res;
        const paymentLink = links.find((link) => link.rel === 'approval_url');
        const paymentPageUrl = paymentLink.href;
        const { token } = query_string_1.default.parseUrl(paymentPageUrl).query;
        return { paymentId: id, token: token, paymentPageUrl: paymentLink.href };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const executePay = (paymentID, paymentInfo) => {
    return new Promise((resolve, reject) => {
        paypal_rest_sdk_1.default.payment.execute(paymentID, paymentInfo, (err, payment) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payment);
            }
        });
    });
};
const execute = (payerID, paymentID, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentInfo = {
        payer_id: payerID,
        transactions: [{ amount }],
    };
    try {
        const res = yield executePay(paymentID, paymentInfo);
        return res;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.default = {
    pay,
    execute,
};
//# sourceMappingURL=paypal.js.map