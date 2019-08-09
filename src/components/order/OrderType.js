const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');

const { DateType } = require('../common/types');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLInt },
    size: { type: GraphQLString },
    currency: { type: GraphQLString },
    quantity: { type: GraphQLInt }
  }
});

const ItemListType = new GraphQLObjectType({
  name: 'ItemList',
  fields: {
    items: { type: new GraphQLList(ItemType) }
  }
});

const DetailsType = new GraphQLObjectType({
  name: 'Details',
  fields: {
    subtotal: { type: GraphQLInt },
    shipping: { type: GraphQLInt }
  }
});

const AmountType = new GraphQLObjectType({
  name: 'Amount',
  fields: {
    details: { type: DetailsType },
    currency: { type: GraphQLString },
    total: { type: GraphQLInt }
  }
});

const CustomerInfoType = new GraphQLObjectType({
  name: 'CustomerInfo',
  fields: {
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    address: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    cellphone: { type: GraphQLString }
  }
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    item_list: { type: ItemListType },
    amount: { type: AmountType },
    description: { type: GraphQLString }
  }
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    _id: { type: GraphQLID },
    paymentId: { type: GraphQLString },
    token: { type: GraphQLString },
    status: { type: GraphQLString },
    date: { type: DateType },
    transaction: { type: TransactionType },
    customerInfo: { type: CustomerInfoType }
  }
});

module.exports = {
  OrderType
};
