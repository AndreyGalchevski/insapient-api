import { FilterQuery, FindAndModifyWriteOpResultObject, ObjectID } from 'mongodb';

export interface OrderItem {
  name: string;
  sku: string;
  price: number;
  size: string;
  currency: string;
  quantity: number;
}

export interface Order {
  _id: ObjectID;
  paymentId: string; // required
  token: string; // required
  status: string;
  date: Date;
  transaction: {
    // eslint-disable-next-line camelcase
    item_list: {
      items: OrderItem[];
    };
    amount: {
      details: {
        subtotal: number;
        shipping: number;
      };
      currency: string;
      total: number;
    };
    description: string;
  };
  customerInfo: {
    fullName: string;
    email: string;
    country: string;
    city: string;
    address: string;
    zipCode: string;
    cellphone: string;
  };
}

export type OrdersService = Readonly<{
  createOrder: (data: Order) => Promise<string>;
  updateOrder: (
    paymentID: string,
    payerID: string,
  ) => Promise<FindAndModifyWriteOpResultObject<Order>>;
  deleteOrder: (query: FilterQuery<Order>) => Promise<FindAndModifyWriteOpResultObject<Order>>;
}>;
