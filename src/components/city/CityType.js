const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: {
    _id: { type: GraphQLID },
    country: { type: GraphQLString },
    name: { type: GraphQLString },
    lat: { type: GraphQLString },
    lng: { type: GraphQLString }
  }
});

module.exports = {
  CityType
};
