import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';

const app = express();
const townRoutes = require('./routes/town');
const destinationRoutes = require('./routes/destination');
const userRoutes = require('./routes/user');
const productsRoutes = require('./routes/products');
const scrappingRoutes = require('./routes/scrappingTask');
const paramsRoutes = require('./routes/params');

app.use(express.json());
app.use(bodyParser.json());
app.use(
  townRoutes,
  destinationRoutes,
  userRoutes,
  productsRoutes,
  scrappingRoutes,
  paramsRoutes
);

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
