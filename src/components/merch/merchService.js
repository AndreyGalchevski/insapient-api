const MerchModel = require('./MerchModel');

const getMerches = async () => {
  try {
    const merches = await MerchModel.find().lean();
    return merches;
  } catch (error) {
    throw error;
  }
};

const getMerch = async merchId => {
  try {
    const merch = await MerchModel.findById(merchId).lean();
    return merch;
  } catch (error) {
    throw error;
  }
};

const updateMerch = async (filter, data) => {
  try {
    const updatedMerch = await MerchModel.findOneAndUpdate(filter, data, { new: true }).lean();
    return updatedMerch;
  } catch (error) {
    throw error;
  }
};

const updateStock = async merches => {
  try {
    let result;
    for (const item of merches) {
      const merch = await getMerch(item.sku);
      if (item.size) {
        merch.stock.sizes[item.size] -= item.quantity;
      }
      merch.stock.total -= item.quantity;
      result = await updateMerch({ _id: item.sku }, merch);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMerches,
  getMerch,
  updateMerch,
  updateStock
};
