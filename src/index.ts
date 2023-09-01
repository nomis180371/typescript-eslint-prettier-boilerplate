import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { BaseEntity } from 'typeorm';
import { DestinationPicture } from './entity/destinationPicture';
import { Destination } from './entity/destination';
import { User } from './entity/user';

const app = express();
const townRoutes = require('./routes/town');
const destinationRoutes = require('./routes/destination');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(bodyParser.json());
app.use(townRoutes);
app.use(destinationRoutes);
app.use(userRoutes);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'simus',
  password: 'daphnelebb1803',
  database: 'travel_app',
  synchronize: true,
  logging: true,
  entities: [BaseEntity, Destination, DestinationPicture, User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('initialized');
  })
  .catch((error) => console.log(error));

app.listen(5002, () => {
  console.log('Server is running on port 5002');
});
