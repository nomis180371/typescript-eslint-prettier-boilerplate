"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const scrappingParamsEntity_1 = require("./modules/scrappingParams/scrappingParamsEntity");
const scrapperDataEntity_1 = require("./modules/scrapper/scrapperDataEntity");
const scrapperImageEntity_1 = require("./modules/scrapper/scrapperImageEntity");
const alertsEntity_1 = require("./modules/alerts/alertsEntity");
const userEntity_1 = require("./modules/user/userEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: './rezell.sqlite',
    synchronize: true,
    logging: false,
    entities: [
        typeorm_2.BaseEntity,
        scrappingParamsEntity_1.ScrappingParamsEntity,
        scrapperDataEntity_1.ScrapperDataEntity,
        scrapperImageEntity_1.ScrapperImageEntity,
        alertsEntity_1.AlertsEntity,
        userEntity_1.User,
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