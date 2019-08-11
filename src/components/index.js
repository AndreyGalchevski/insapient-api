const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const { CityType, cityResolver } = require('./city');
const { CountryType, countryResolver } = require('./country');
const { GigType, gigResolver } = require('./gig');
const { LyricType, lyricResolver } = require('./lyric');
const { MemberType, memberResolver } = require('./member');
const { MerchType, merchResolver } = require('./merch');
const { OrderInputType, OrderType, orderResolver } = require('./order');
const { SongType, songResolver } = require('./song');
const { VideoType, videoResolver } = require('./video');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cities: {
      type: new GraphQLList(CityType),
      args: { country: { type: GraphQLNonNull(GraphQLString) } },
      resolve: cityResolver.getCities
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve: countryResolver.getCountries
    },
    gigs: {
      type: new GraphQLList(GigType),
      resolve: gigResolver.getGigs
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve: lyricResolver.getLyrics
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve: memberResolver.getMembers
    },
    merches: {
      type: new GraphQLList(MerchType),
      resolve: merchResolver.getMerches
    },
    merch: {
      type: MerchType,
      args: { merchId: { type: GraphQLNonNull(GraphQLString) } },
      resolve: merchResolver.getMerch
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve: songResolver.getSongs
    },
    videos: {
      type: new GraphQLList(VideoType),
      resolve: videoResolver.getVideos
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createOrder: {
      type: GraphQLString,
      args: {
        order: { type: new GraphQLNonNull(OrderInputType) }
      },
      resolve: orderResolver.createOrder
    },
    updateOrder: {
      type: OrderType,
      args: {
        order: { type: new GraphQLNonNull(OrderInputType) }
      },
      resolve: orderResolver.updateOrder
    },
    deleteOrder: {
      type: OrderType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: orderResolver.deleteOrder
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = {
  schema
};