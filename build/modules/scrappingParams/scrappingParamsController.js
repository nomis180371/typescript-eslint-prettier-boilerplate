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
exports.ScrappingParamsController = void 0;
const scrappingParamsRepository_1 = require("./scrappingParamsRepository");
class ScrappingParamsController {
    constructor() {
        this.scrappingParamsRepository = new scrappingParamsRepository_1.ScrappingParamsRepository();
    }
    getScrappingParamByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.scrappingParamsRepository.getScrappingParamByType(req.query.param);
                console.log('getScrappingParamByType', req.query.param);
                return res.status(200).send(result);
            }
            catch (error) {
                console.log('ScrappingParamsController.getScrappingParamByType', error);
                return res.status(500).send(error);
            }
        });
    }
}
exports.ScrappingParamsController = ScrappingParamsController;
//# sourceMappingURL=scrappingParamsController.js.map