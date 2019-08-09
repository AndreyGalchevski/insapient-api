const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: {
    _id: { type: GraphQLID },
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

module.exports = {
  CountryType
};
