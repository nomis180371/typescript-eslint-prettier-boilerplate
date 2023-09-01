"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const destination_1 = require("./entity/destination");
const destinationPicture_1 = require("./entity/destinationPicture");
const typeorm_2 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'simus',
    password: 'daphnelebb1803',
    database: 'travel_app',
    synchronize: true,
    logging: true,
    entities: [typeorm_2.BaseEntity, destination_1.Destination, destinationPicture_1.DestinationPicture],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('initiealized');
})
    .catch((error) => console.log(error));
//# sourceMappingURL=data-source.js.map