"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappingParamsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const scrappingParamsController_1 = require("./scrappingParamsController");
class ScrappingParamsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.scrappingParamsController = new scrappingParamsController_1.ScrappingParamsController();
        this.router.get('/getParamsById', this.scrappingParamsController.getScrappingParamByType.bind(this.scrappingParamsController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ScrappingParamsRoutes = ScrappingParamsRoutes;
//# sourceMappingURL=scrappingParamsRoutes.js.map