import { ObjectID, Db, FilterQuery } from 'mongodb';

import { Merchandise, MerchandisesService } from './merchandises-types';
import { OrderItem } from '../orders/orders-types';

const MerchandisesService = (db: Db): MerchandisesService => {
  const getMerchandises = async () => {
    const merchandises = await db.collection<Merchandise>('merches').find().toArray();
    return merchandises;
  };

  const getMerchandise = async (merchandiseID: string) => {
    const merchandise = await db
      .collection<Merchandise>('merches')
      .findOne({ _id: new ObjectID(merchandiseID) });
    return merchandise;
  };

  const updateMerchandise = async (query: FilterQuery<Merchandise>, data: Merchandise) => {
    const updatedMerchandise = await db
      .collection<Merchandise>('merches')
      .findOneAndUpdate(query, { $set: data });
    return updatedMerchandise;
  };

  const updateStock = async (merchandises: OrderItem[]) => {
    const result = await Promise.all(
      merchandises.map(async (item) => {
        const merchandise = await getMerchandise(item.sku);
        if (item.size) {
          merchandise.stock.sizes[item.size] -= item.quantity;
        }
        merchandise.stock.total -= item.quantity;
        return updateMerchandise({ _id: item.sku }, merchandise);
      }),
    );

    return result;
  };

  return Object.freeze({
    getMerchandises,
    getMerchandise,
    updateMerchandise,
    updateStock,
  });
};

export default MerchandisesService;
