import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Destination } from './entity/destination';
import { DestinationPicture } from './entity/destinationPicture';
import { BaseEntity } from 'typeorm';
import { User } from './entity/user';
import { ScrappingParams } from './entity/params/ScrappingParams';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'Adelaplusbg159!',
  database: 'scrapping',
  synchronize: true,
  logging: true,
  entities: [
    BaseEntity,
    Destination,
    DestinationPicture,
    User,
    ScrappingParams,
  ],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('initiealized');
  })
  .catch((error) => console.log(error));
