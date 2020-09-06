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
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY);
const sendShippingInformation = (order) => __awaiter(void 0, void 0, void 0, function* () {
    let items = '';
    order.transaction.item_list.items.forEach((item) => {
        items += `
      <li>
        <p>Item: ${item.name}</p>
        <p>Size: ${item.size}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ${item.price} ${item.currency}</p>
      </li>
    `;
    });
    const info = {
        from: { email: 'store@insapient.band', name: 'Insapient Store' },
        to: process.env.SHIPPING_PROVIDER_EMAIL,
        subject: `Order #${order._id} Information`,
        html: `
      <div>
        <div>
          <h4>Customer Info</h4>
          <p>Name: ${order.customerInfo.fullName}</p>
          <p>Email: ${order.customerInfo.email}</p>
          <p>Country: ${order.customerInfo.country}</p>
          <p>City: ${order.customerInfo.city}</p>
          <p>Address: ${order.customerInfo.address}</p>
          <p>Zip Code: ${order.customerInfo.zipCode}</p>
          <p>Cellphone: ${order.customerInfo.cellphone}</p>
        </div>
        <div>
          <h4>Items</h4>
          <ul>
            ${items}
          </ul>
        </div>
        <div>
          <h4>Subtotal</h4>
          <p>${order.transaction.amount.details.subtotal} ${order.transaction.amount.currency}</p>
          <h4>Shipping</h4>
          <p>${order.transaction.amount.details.shipping} ${order.transaction.amount.currency}</p>
          <h4>Total</h4>
          <p>${order.transaction.amount.total} ${order.transaction.amount.currency}</p>
        </div>
      </div>

    `,
    };
    return mail_1.default.send(info);
});
const sendPaymentConfirmation = (order) => __awaiter(void 0, void 0, void 0, function* () {
    let items = '';
    order.transaction.item_list.items.forEach((item) => {
        items += `
      <li>
        <p>Item: ${item.name}</p>
        <p>Size: ${item.size}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ${item.price} ${item.currency}</p>
      </li>
    `;
    });
    const info = {
        from: { email: 'store@insapient.band', name: 'Insapient Store' },
        to: order.customerInfo.email,
        subject: 'Payment confirmation',
        html: `
      <div>
        <div>
          <p>Hello ${order.customerInfo.fullName}!</p>
          <p>We have received your order (#${order._id})</p>
          <p>You will be notified once the order has been shipped.</p>
          <p>It usually takes 2-4 business days.</p>
          <p>Thank you for supporting our band.</p>
        </div>
        <div>
          <h4>Details</h4>
          <ul>
            ${items}
          </ul>
        </div>
        <div>
          <h4>Subtotal</h4>
          <p>${order.transaction.amount.details.subtotal} ${order.transaction.amount.currency}</p>
          <h4>Shipping</h4>
          <p>${order.transaction.amount.details.shipping} ${order.transaction.amount.currency}</p>
          <h4>Total</h4>
          <p>${order.transaction.amount.total} ${order.transaction.amount.currency}</p>
        </div>
      </div>
    `,
    };
    return mail_1.default.send(info);
});
exports.default = {
    sendShippingInformation,
    sendPaymentConfirmation,
};
//# sourceMappingURL=mailer.js.map