"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappperRoutes = void 0;
const express_1 = __importDefault(require("express"));
const scrapperController_1 = require("./scrapperController");
class ScrappperRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.scrapperController = new scrapperController_1.ScrapperController();
        this.router.get('/scrape', this.scrapperController.startScrapping.bind(this.scrapperController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ScrappperRoutes = ScrappperRoutes;
//# sourceMappingURL=scrapperRoutes.js.map