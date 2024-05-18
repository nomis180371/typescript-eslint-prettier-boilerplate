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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrappingParamsEntity_1 = require("../shit/scrappingParams/scrappingParamsEntity");
const sources_1 = require("../types/sources");
const brand_json_1 = __importDefault(require("../data/vinted/brand.json"));
const data_source_1 = require("../data-source");
const migrateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    const vintedBrandParamRepository = yield data_source_1.AppDataSource.getRepository(scrappingParamsEntity_1.ScrappingParams);
    try {
        if (type === 'brand') {
            for (const brandData of brand_json_1.default) {
                const newBrand = scrappingParamsEntity_1.ScrappingParams.create({
                    title: brandData.title,
                    paramId: brandData.id.toString(),
                    type: sources_1.ParamTypeEnum.BRAND,
                    source: sources_1.SourcesEnum.VINTED,
                    slug: brandData.slug,
                    lastModificationDate: new Date(),
                });
                yield vintedBrandParamRepository.save(newBrand);
            }
        }
        console.log('Migration des données terminée avec succès.');
        return res.sendStatus(200);
    }
    catch (error) {
        console.error('Erreur lors de la migration des données :', error);
    }
});
module.exports = {
    migrateData,
};
//# sourceMappingURL=vintedDataMigrator.js.map