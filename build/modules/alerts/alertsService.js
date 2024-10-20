"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const alertsRepository_1 = require("./alertsRepository");
class AlertsService {
    constructor() {
        this.alertsRepository = new alertsRepository_1.AlertsRepository();
    }
    createAlert() {
        try {
            // this.alertsRepository.createAlert()
        }
        catch (error) {
            console.log('ScrapperService.createAlert');
        }
    }
}
exports.AlertsService = AlertsService;
//# sourceMappingURL=alertsService.js.map