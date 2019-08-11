require('dotenv').config();

const express = require('express');

const db = require('./utils/db');
const commonMiddleware = require('./middleware/commonMiddleware');
const graphQLMiddleware = require('./middleware/graphQLMiddleware');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

const port = process.env.PORT || 8080;

db.connect();

const app = express();

commonMiddleware.init(app);
graphQLMiddleware.init(app);
errorHandlingMiddleware.init(app);

app.listen(port);

console.log(`Server running on port ${port}`);
