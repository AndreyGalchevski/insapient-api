require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const graphqlHTTP = require('express-graphql');
const createError = require('http-errors');

const db = require('./utils/db');
const { schema } = require('./components');
const orderController = require('./components/order/orderController');

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8080;

db.connect();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/health', (req, res) => res.send('I`m alive'));

app.post('/api/orders', orderController.createOrder);
app.put('/api/orders', orderController.updateOrder);
app.delete('/api/orders', orderController.deleteOrder);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: !isProd
  })
);

app.use((err, req, res, next) => {
  next(createError(500, 'Something went terribly wrong'));
});

app.use((req, res, next) => {
  next(createError(404, 'Resource Not Found'));
});

app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
