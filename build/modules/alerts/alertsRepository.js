"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsRepository = void 0;
const data_source_1 = require("../../data-source");
const alertsEntity_1 = require("./alertsEntity");
class AlertsRepository {
    constructor() { }
    createAlert(alert) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                const newAlert = new alertsEntity_1.AlertsEntity();
                newAlert.userId = alert.userId;
                newAlert.channel = alert.channel;
                newAlert.productParams = alert.productParams;
                newAlert.creationDate = new Date();
                yield queryRunner.manager.save(newAlert);
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                console.log('alertsRepository.createAlert', error);
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.AlertsRepository = AlertsRepository;
//# sourceMappingURL=alertsRepository.js.map