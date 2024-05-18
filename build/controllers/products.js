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
const unescape = require('unescape-js');
const ScrappingParams_1 = require("../entity/params/ScrappingParams");
const sources_1 = require("../types/sources");
const brand_json_1 = __importDefault(require("../data/vinted/brand.json"));
const catalog_json_1 = __importDefault(require("../data/vinted/catalog.json"));
const size_json_1 = __importDefault(require("../data/vinted/size.json"));
const status_json_1 = __importDefault(require("../data/vinted/status.json"));
const color_json_1 = __importDefault(require("../data/vinted/color.json"));
const data_source_1 = require("../data-source");
const migrateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    const paramsRepository = yield data_source_1.AppDataSource.getRepository(ScrappingParams_1.ScrappingParams);
    try {
        if (type === 'brand') {
            for (const brandData of brand_json_1.default) {
                const newBrand = ScrappingParams_1.ScrappingParams.create({
                    title: unescape(brandData.title),
                    paramId: brandData.id.toString(),
                    type: sources_1.ParamTypeEnum.BRAND,
                    source: sources_1.SourcesEnum.VINTED,
                    slug: brandData.slug,
                    lastModificationDate: new Date(),
                });
                yield paramsRepository.save(newBrand);
            }
        }
        else if (type === 'catalog') {
            // 0 => Womens
            // 1 => Mens
            for (let catalogType of catalog_json_1.default[1].catalogs) {
                const newType = ScrappingParams_1.ScrappingParams.create({
                    title: unescape(catalogType.title),
                    paramId: catalogType.id.toString(),
                    type: sources_1.ParamTypeEnum.CATALOG,
                    source: sources_1.SourcesEnum.VINTED,
                    lastModificationDate: new Date(),
                    gender: 'M',
                    parentId: null,
                });
                yield paramsRepository.save(newType);
                for (let childType of catalogType.catalogs) {
                    const newChildType = ScrappingParams_1.ScrappingParams.create({
                        title: unescape(childType.title),
                        paramId: childType.id.toString(),
                        type: sources_1.ParamTypeEnum.CATALOG,
                        source: sources_1.SourcesEnum.VINTED,
                        slug: childType.url,
                        lastModificationDate: new Date(),
                        gender: 'M',
                        parentId: catalogType.id.toString(),
                    });
                    yield paramsRepository.save(newChildType);
                    for (let grandChildType of childType.catalogs) {
                        const newGrandChildType = ScrappingParams_1.ScrappingParams.create({
                            title: unescape(grandChildType.title),
                            paramId: grandChildType.id.toString(),
                            type: sources_1.ParamTypeEnum.CATALOG,
                            source: sources_1.SourcesEnum.VINTED,
                            slug: childType.url,
                            lastModificationDate: new Date(),
                            gender: 'M',
                            parentId: childType.id.toString(),
                        });
                        yield paramsRepository.save(newGrandChildType);
                    }
                }
            }
        }
        else if (type === 'sizes') {
            for (let size of size_json_1.default) {
                if (size.sizes.length > 0) {
                    const sizeItem = ScrappingParams_1.ScrappingParams.create({
                        title: unescape(size.description),
                        paramId: size.id.toString(),
                        type: sources_1.ParamTypeEnum.SIZE,
                        source: sources_1.SourcesEnum.VINTED,
                        lastModificationDate: new Date(),
                    });
                    yield paramsRepository.save(sizeItem);
                    for (let childSize of size.sizes) {
                        const childSizeItem = ScrappingParams_1.ScrappingParams.create({
                            title: unescape(childSize.title),
                            paramId: childSize.id.toString(),
                            type: sources_1.ParamTypeEnum.SIZE,
                            source: sources_1.SourcesEnum.VINTED,
                            lastModificationDate: new Date(),
                            parentId: size.id.toString(),
                        });
                        yield paramsRepository.save(childSizeItem);
                    }
                }
            }
        }
        else if (type === 'status') {
            for (let status of status_json_1.default) {
                const newStatus = ScrappingParams_1.ScrappingParams.create({
                    title: unescape(status.title),
                    paramId: status.id.toString(),
                    type: sources_1.ParamTypeEnum.STATUS,
                    source: sources_1.SourcesEnum.VINTED,
                    lastModificationDate: new Date(),
                    parentId: status.id.toString(),
                    order: status.order,
                });
                yield paramsRepository.save(newStatus);
            }
        }
        else if (type === 'color') {
            for (let color of color_json_1.default) {
                const newColor = ScrappingParams_1.ScrappingParams.create({
                    title: unescape(color.title),
                    paramId: color.id.toString(),
                    type: sources_1.ParamTypeEnum.COLOR,
                    source: sources_1.SourcesEnum.VINTED,
                    lastModificationDate: new Date(),
                    code: color.code,
                });
                yield paramsRepository.save(newColor);
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
//# sourceMappingURL=products.js.map