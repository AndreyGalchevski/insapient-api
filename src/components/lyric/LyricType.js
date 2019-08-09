const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const LyricType = new GraphQLObjectType({
  name: 'Lyric',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    text: { type: GraphQLString }
  }
});

module.exports = {
  LyricType
};
