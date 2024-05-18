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
exports.ScrappingParamsRepository = void 0;
const data_source_1 = require("../data-source");
const scrappingParamsType_1 = require("./scrappingParamsType");
const _ = require('lodash');
class ScrappingParamsRepository {
    constructor() { }
    getScrappingParamByType(paramType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (_.isNil(scrappingParamsType_1.ParamTypeEnum[paramType.toUpperCase()]))
                    throw new Error('Invalid Param');
                const queryRunner = yield data_source_1.AppDataSource.createQueryRunner();
                const query = `
        SELECT *
        FROM scrapping_params
        WHERE type = '${scrappingParamsType_1.ParamTypeEnum[paramType.toUpperCase()] || ''}'
      `;
                const result = yield queryRunner.manager.query(query);
                return result;
            }
            catch (error) {
                console.log('ScrappingParamsRepository.getScrappingParamByType', error);
                throw error;
            }
        });
    }
    getScrappingParamsByParamIdAndSearch(paramType, searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (_.isNil(scrappingParamsType_1.ParamTypeEnum[paramType.toUpperCase()]))
                    throw new Error('Invalid Param');
                const queryRunner = yield data_source_1.AppDataSource.createQueryRunner();
                const query = `
        SELECT *
        FROM scrapping_params
        WHERE type = ${scrappingParamsType_1.ParamTypeEnum[paramType]}
        AND title like '%${searchStr}%'
      `;
                const result = yield queryRunner.manager.query(query);
                return result;
            }
            catch (error) {
                console.log('ScrappingParamsRepository.getScrappingParamsByParamIdAndSearch', error);
                throw error;
            }
        });
    }
}
exports.ScrappingParamsRepository = ScrappingParamsRepository;
//# sourceMappingURL=scrappingParamsRepository.js.map