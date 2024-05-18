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
const scrappingParamsEntity_1 = require("../scrappingParams/scrappingParamsEntity");
const sources_1 = require("../types/sources");
class ScrappingParamsRepository {
    static getScrappingParamByType(paramType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.AppDataSource.getRepository(scrappingParamsEntity_1.ScrappingParams)
                    .createQueryBuilder('params')
                    .where('params.type', sources_1.ParamTypeEnum[paramType]);
            }
            catch (error) {
                console.log('ScrappingParamsRepository.getScrappingParamByType', error);
            }
        });
    }
    static getScrappingParamsByParamIdAndSearch(paramType, searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.AppDataSource.getRepository(scrappingParamsEntity_1.ScrappingParams)
                    .createQueryBuilder('params')
                    .where('params.type', sources_1.ParamTypeEnum[paramType])
                    .andWhere(`params.title ILIKE :searchStr`, {
                    searchStr: `%${searchStr}%`,
                })
                    .getMany();
            }
            catch (error) { }
        });
    }
}
exports.ScrappingParamsRepository = ScrappingParamsRepository;
//# sourceMappingURL=scrappingParamsRepository.js.map