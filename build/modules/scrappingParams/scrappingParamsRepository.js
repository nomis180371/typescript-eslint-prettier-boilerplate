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
const data_source_1 = require("../../data-source");
const scrappingParamsType_1 = require("../../types/scrappingParamsType");
const scrappingParamsEntity_1 = require("./scrappingParamsEntity");
const typeorm_1 = require("typeorm");
class ScrappingParamsRepository {
    constructor() { }
    getScrappingParamByType(paramType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramEnum = scrappingParamsType_1.ParamTypeEnum[paramType.toUpperCase()];
                if (!paramEnum)
                    throw new Error('Invalid Param');
                const scrappingParamsRepository = data_source_1.AppDataSource.getRepository(scrappingParamsEntity_1.ScrappingParamsEntity);
                const result = yield scrappingParamsRepository.find({
                    where: { type: paramEnum },
                });
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
                const paramEnum = scrappingParamsType_1.ParamTypeEnum[paramType.toUpperCase()];
                if (!paramEnum)
                    throw new Error('Invalid Param');
                const scrappingParamsRepository = data_source_1.AppDataSource.getRepository(scrappingParamsEntity_1.ScrappingParamsEntity);
                const result = yield scrappingParamsRepository.find({
                    where: {
                        type: paramEnum,
                        title: (0, typeorm_1.Like)(`%${searchStr}%`),
                    },
                });
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