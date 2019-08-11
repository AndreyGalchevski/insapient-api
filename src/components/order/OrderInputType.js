const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const { DateType } = require('../common/types');

const ItemInputType = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: {
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLInt },
    size: { type: GraphQLString },
    currency: { type: GraphQLString },
    quantity: { type: GraphQLInt }
  }
});

const ItemListInputType = new GraphQLInputObjectType({
  name: 'ItemListInput',
  fields: {
    items: { type: new GraphQLList(ItemInputType) }
  }
});

const DetailsInputType = new GraphQLInputObjectType({
  name: 'DetailsInput',
  fields: {
    subtotal: { type: GraphQLInt },
    shipping: { type: GraphQLInt }
  }
});

const AmountInputType = new GraphQLInputObjectType({
  name: 'AmountInput',
  fields: {
    details: { type: DetailsInputType },
    currency: { type: GraphQLString },
    total: { type: GraphQLInt }
  }
});

const CustomerInfoInputType = new GraphQLInputObjectType({
  name: 'CustomerInfoInput',
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

const TransactionInputType = new GraphQLInputObjectType({
  name: 'TransactionInput',
  fields: {
    item_list: { type: ItemListInputType },
    amount: { type: AmountInputType },
    description: { type: GraphQLString }
  }
});

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInput',
  fields: {
    paymentId: { type: GraphQLString },
    payerId: { type: GraphQLString },
    token: { type: GraphQLString },
    status: { type: GraphQLString },
    date: { type: DateType },
    transaction: { type: TransactionInputType },
    customerInfo: { type: CustomerInfoInputType }
  }
});

module.exports = {
  OrderInputType
};
