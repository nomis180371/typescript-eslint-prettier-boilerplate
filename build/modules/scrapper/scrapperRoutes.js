"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperRoutes = void 0;
const express_1 = __importDefault(require("express"));
const scrapperController_1 = require("./scrapperController");
class ScrapperRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.scrapperController = new scrapperController_1.ScrapperController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/scrape', this.scrapperController.startScrapping.bind(this.scrapperController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ScrapperRoutes = ScrapperRoutes;
//# sourceMappingURL=scrapperRoutes.js.map