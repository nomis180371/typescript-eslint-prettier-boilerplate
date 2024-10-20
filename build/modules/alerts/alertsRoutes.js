"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const alertsController_1 = require("./alertsController");
class AlertsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.alertsController = new alertsController_1.AlertsController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/new', this.alertsController.createAlert.bind(this.alertsController));
    }
    getRouter() {
        return this.router;
    }
}
exports.AlertsRoutes = AlertsRoutes;
//# sourceMappingURL=alertsRoutes.js.map