import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { ScrappingParamsEntity } from './modules/scrappingParams/scrappingParamsEntity';
import { ScrapperDataEntity } from './modules/scrapper/scrapperDataEntity';
import { ScrapperImageEntity } from './modules/scrapper/scrapperImageEntity';
import { AlertsEntity } from './modules/alerts/alertsEntity';
import { User } from './modules/user/userEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './rezell.sqlite',
  synchronize: false,
  logging: false,
  entities: [
    BaseEntity,
    ScrappingParamsEntity,
    ScrapperDataEntity,
    ScrapperImageEntity,
    AlertsEntity,
    User,
  ],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Datasource is initialized');
  })
  .catch((error) => console.log(error));
