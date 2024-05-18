"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const scrappingParamsEntity_1 = require("./scrappingParams/scrappingParamsEntity");
const scrapperDataEntity_1 = require("./scrapper/scrapperDataEntity");
const scrapperImageEntity_1 = require("./scrapper/scrapperImageEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'Adelaplusbg159!',
    database: 'scrapping',
    synchronize: true,
    logging: false,
    entities: [
        typeorm_2.BaseEntity,
        scrappingParamsEntity_1.ScrappingParamsEntity,
        scrapperDataEntity_1.ScrapperDataEntity,
        scrapperImageEntity_1.ScrapperImageEntity,
    ],
    subscribers: [],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Datasource is initialized');
})
    .catch((error) => console.log(error));
//# sourceMappingURL=data-source.js.map