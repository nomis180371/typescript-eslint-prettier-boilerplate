"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const data_source_1 = require("./data-source");
const scrappingParamsRoutes_1 = require("./modules/scrappingParams/scrappingParamsRoutes");
const scrapperRoutes_1 = require("./modules/scrapper/scrapperRoutes");
const alertsRoutes_1 = require("./modules/alerts/alertsRoutes");
const userRoutes_1 = require("./modules/user/userRoutes");
const authRoutes_1 = require("./modules/auth/authRoutes");
require("./modules/auth/passportConfig");
const app = (0, express_1.default)();
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Initialize routes
const paramsRoutes = new scrappingParamsRoutes_1.ScrappingParamsRoutes();
const scrapperRoutes = new scrapperRoutes_1.ScrapperRoutes();
const alertsRoutes = new alertsRoutes_1.AlertsRoutes();
const userRoutes = new userRoutes_1.UserRoutes();
const authRoutes = new authRoutes_1.AuthRoutes();
app.use('/api/scrapping-params', paramsRoutes.getRouter());
app.use('/api/scrapper', scrapperRoutes.getRouter());
app.use('/api/alerts', alertsRoutes.getRouter());
app.use('/api/users', userRoutes.getRouter());
app.use('/api/auth', authRoutes.getRouter());
app.get('/', (req, res) => {
    res.send('Home Page');
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map