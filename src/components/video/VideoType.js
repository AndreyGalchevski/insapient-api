const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const { DateType } = require('../common/types');

const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    date: { type: DateType }
  }
});

module.exports = {
  VideoType
};
