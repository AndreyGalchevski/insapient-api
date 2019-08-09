const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  }
});

module.exports = {
  SongType
};
