import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { ScrappingParamsEntity } from './scrappingParams/scrappingParamsEntity';
import { ScrapperDataEntity } from './scrapper/scrapperDataEntity';
import { ScrapperImageEntity } from './scrapper/scrapperImageEntity';
import { AlertsEntity } from './alerts/alertsEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'Adelaplusbg159!',
  database: 'scrapping',
  synchronize: true,
  logging: false,
  entities: [
    BaseEntity,
    ScrappingParamsEntity,
    ScrapperDataEntity,
    ScrapperImageEntity,
    AlertsEntity,
  ],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Datasource is initialized');
  })
  .catch((error) => console.log(error));
