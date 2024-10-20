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
exports.ScrapperRepository = void 0;
const data_source_1 = require("../../data-source");
const scrapperDataEntity_1 = require("./scrapperDataEntity");
const scrapperImageEntity_1 = require("./scrapperImageEntity");
class ScrapperRepository {
    constructor() { }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                const scrapperData = new scrapperDataEntity_1.ScrapperDataEntity();
                scrapperData.link = product.link;
                scrapperData.date = new Date();
                scrapperData.price = product.price;
                scrapperData.currency = product.currency;
                scrapperData.title = product.title;
                scrapperData.description = product.description;
                scrapperData.brand = product.brand;
                scrapperData.type = product.type;
                scrapperData.colorId = Number(product.colorId);
                scrapperData.isSuspicious = product.isSuspicious;
                scrapperData.size = product.size;
                scrapperData.viewCount = product.viewCount;
                scrapperData.feedbackReputation = product.feedbackReputation;
                const result = yield queryRunner.manager.save(scrapperData);
                yield queryRunner.commitTransaction();
                yield this.saveImages(result.id, product.imagesUrl);
                return result;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                console.error("Erreur lors de l'insertion du produit :", error);
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    checkProductExistance(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield data_source_1.AppDataSource.getRepository(scrapperDataEntity_1.ScrapperDataEntity).findOne({
                    where: {
                        link: product.link,
                        price: product.price,
                        currency: product.currency,
                        title: product.title,
                        description: product.description,
                        brand: product.brand,
                        type: product.type,
                        colorId: Number(product.colorId),
                        isSuspicious: product.isSuspicious,
                        size: product.size,
                        viewCount: product.viewCount,
                    },
                });
                return !!result;
            }
            catch (error) {
                console.error('scrapperRepository.checkProductExistance', error);
                return false;
            }
        });
    }
    saveImages(parentId, imagesUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                for (const img of imagesUrl) {
                    const scrapperImage = new scrapperImageEntity_1.ScrapperImageEntity();
                    scrapperImage.parentId = parentId;
                    scrapperImage.imageUrl = img;
                    yield queryRunner.manager.save(scrapperImage);
                }
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                console.error('scrapperRepository.saveImages', error);
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.ScrapperRepository = ScrapperRepository;
//# sourceMappingURL=scrapperRepository.js.map