const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require('graphql');

const SizesType = new GraphQLObjectType({
  name: 'Sizes',
  fields: {
    XS: { type: GraphQLInt },
    S: { type: GraphQLInt },
    M: { type: GraphQLInt },
    L: { type: GraphQLInt },
    XL: { type: GraphQLInt },
    XXL: { type: GraphQLInt }
  }
});

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: {
    sizes: { type: SizesType },
    total: { type: GraphQLInt }
  }
});

const MerchType = new GraphQLObjectType({
  name: 'Merch',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    price: { type: GraphQLInt },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    stock: { type: StockType }
  }
});

module.exports = {
  MerchType
};
