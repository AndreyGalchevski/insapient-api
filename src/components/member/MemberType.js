const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    instrument: { type: GraphQLString },
    info: { type: GraphQLString },
    image: { type: GraphQLString }
  }
});

module.exports = {
  MemberType
};
