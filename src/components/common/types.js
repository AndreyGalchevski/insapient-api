const { GraphQLScalarType } = require('graphql');

const DateType = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return new Date(value);
  }
});

module.exports = {
  DateType
};
