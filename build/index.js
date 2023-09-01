"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const typeorm_2 = require("typeorm");
const destinationPicture_1 = require("./entity/destinationPicture");
const destination_1 = require("./entity/destination");
const app = express_1.default();
const townRoutes = require('./routes/town');
const destinationRoutes = require('./routes/destination');
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(townRoutes);
app.use(destinationRoutes);
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
    console.log('initialized');
})
    .catch((error) => console.log(error));
app.listen(5002, () => {
    console.log('Server is running on port 5002');
});
//# sourceMappingURL=index.js.map