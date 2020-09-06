import { FindAndModifyWriteOpResultObject, FilterQuery } from 'mongodb';

import { OrderItem } from '../orders/orders-types';

export interface Merchandise {
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  stock: {
    sizes: {
      XS: number;
      S: number;
      M: number;
      L: number;
      XL: number;
      XXL: number;
    };
    total: number;
  };
}

export type MerchandisesService = Readonly<{
  getMerchandises: () => Promise<Merchandise[]>;
  getMerchandise: (merchandiseID: string) => Promise<Merchandise>;
  updateMerchandise: (
    query: FilterQuery<Merchandise>,
    data: Merchandise,
  ) => Promise<FindAndModifyWriteOpResultObject<Merchandise>>;
  updateStock: (
    merchandises: OrderItem[],
  ) => Promise<FindAndModifyWriteOpResultObject<Merchandise>[]>;
}>;
