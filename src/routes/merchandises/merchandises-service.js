const { ObjectID } = require('mongodb');

const MerchandisesService = db => {
  const getMerchandises = async () => {
    const merchandises = await db
      .collection('merches')
      .find()
      .toArray();
    return merchandises;
  };

  const getMerchandise = async merchandiseID => {
    const merchandise = await db
      .collection('merches')
      .findOne({ _id: new ObjectID(merchandiseID) });
    return merchandise;
  };

  const updateMerchandise = async (query, data) => {
    const updatedMerchandise = await db.collection('merches').findOneAndUpdate(query, data);
    return updatedMerchandise;
  };

  const updateStock = async merchandises => {
    const result = await Promise.all(
      merchandises.map(async item => {
        const merchandise = await getMerchandise(item.sku);
        if (item.size) {
          merchandise.stock.sizes[item.size] -= item.quantity;
        }
        merchandise.stock.total -= item.quantity;
        return updateMerchandise({ _id: item.sku }, merchandise);
      })
    );

    return result;
  };

  return Object.freeze({
    getMerchandises,
    getMerchandise,
    updateMerchandise,
    updateStock
  });
};

module.exports = MerchandisesService;
