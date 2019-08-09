const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const GigType = new GraphQLObjectType({
  name: 'Gig',
  fields: {
    _id: { type: GraphQLID },
    venue: { type: GraphQLString },
    address: { type: GraphQLString },
    date: { type: GraphQLString },
    hour: { type: GraphQLString },
    fbEvent: { type: GraphQLString },
    image: { type: GraphQLString }
  }
});

module.exports = {
  GigType
};
