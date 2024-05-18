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
const data_source_1 = require("../data-source");
const sources_1 = require("../types/sources");
const ScrappingParams_1 = require("../entity/params/ScrappingParams");
const typeorm_1 = require("typeorm");
const getScrappingDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsRepository = yield data_source_1.AppDataSource.getRepository(ScrappingParams_1.ScrappingParams);
    try {
        const paramType = req.query.param;
        const parentId = req.query.parentId || null;
        const stringToSearch = req.query.stringToSearch || null;
        const genderToSearch = req.query.gender || null;
        const colorToSearch = req.query.color || null;
        let whereCondition = {
            type: paramType,
            parentId: parentId,
        };
        if (stringToSearch) {
            whereCondition.title = (0, typeorm_1.ILike)(`%${stringToSearch}%`);
        }
        if (genderToSearch && paramType === sources_1.ParamTypeEnum.CATALOG) {
            whereCondition.gender = genderToSearch;
        }
        console.log(colorToSearch || null);
        if (colorToSearch && paramType === sources_1.ParamTypeEnum.COLOR) {
            whereCondition.code = colorToSearch;
        }
        const result = yield paramsRepository.find({
            where: whereCondition,
            order: {
                title: 'ASC',
            },
            skip: 0,
            take: 5,
            cache: true,
        });
        return res.status(200).send(result);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = {
    getScrappingDataById,
};
//# sourceMappingURL=scrappingParams.js.map