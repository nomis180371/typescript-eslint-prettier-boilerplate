import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Destination } from './entity/destination';
import { DestinationPicture } from './entity/destinationPicture';
import { BaseEntity } from 'typeorm';
import { User } from './entity/user';

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
    console.log('initiealized');
  })
  .catch((error) => console.log(error));
