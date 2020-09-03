const { graphqlHTTP } = require('express-graphql');

const { schema } = require('../components');

const isProd = process.env.NODE_ENV === 'production';

const init = app => {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: !isProd
    })
  );
};

module.exports = {
  init
};
