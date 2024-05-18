"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const scrappingParamsRoutes_1 = require("./scrappingParams/scrappingParamsRoutes");
const scrapperRoutes_1 = require("./scrapper/scrapperRoutes");
const app = (0, express_1.default)();
const paramsRoutes = new scrappingParamsRoutes_1.ScrappingParamsRoutes();
const scrapperRoutes = new scrapperRoutes_1.ScrappperRoutes();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(paramsRoutes.getRouter(), scrapperRoutes.getRouter());
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
//# sourceMappingURL=index.js.map