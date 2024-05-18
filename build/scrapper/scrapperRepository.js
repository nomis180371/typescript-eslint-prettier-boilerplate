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
const data_source_1 = require("../data-source");
class ScrapperRepository {
    constructor() { }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = yield data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                const query = `
            INSERT INTO scrapper_data_entity (link, date, price, currency, title, description, brand, type, "colorId", "isSuspicious", size, "viewCount", "feedbackReputation")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id;
        `;
                const result = yield queryRunner.manager.query(query, [
                    product.link,
                    new Date(),
                    product.price,
                    product.currency,
                    product.title,
                    product.description,
                    product.brand,
                    product.type,
                    product.colorId,
                    product.isSuspicious,
                    product.size,
                    product.viewCount,
                    product.feedbackReputation,
                ]);
                yield queryRunner.commitTransaction();
                if (result[0].id)
                    this.saveImages(result[0].id, product.imagesUrl);
                return result;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                console.error("Erreur lors de l'insertion du produit :", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    checkProductExistance(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        SELECT * FROM scrapper_data_entity
        WHERE
            link = $1
            AND price = $2
            AND currency = $3
            AND title = $4
            AND description = $5
            AND brand = $6
            AND type = $7
            AND "colorId" = $8
            AND "isSuspicious" = $9
            AND size = $10
            AND "viewCount" = $11
    `;
            const queryRunner = yield data_source_1.AppDataSource.createQueryRunner();
            try {
                const result = yield queryRunner.manager.query(query, [
                    product.link,
                    product.price,
                    product.currency,
                    product.title,
                    product.description,
                    product.brand,
                    product.type,
                    product.colorId,
                    product.isSuspicious,
                    product.size,
                    product.viewCount,
                ]);
                return result.length > 0;
            }
            catch (error) {
                console.error('scrapperRepository.checkProductExistance', error);
                return false;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    saveImages(parentId, imagesUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = yield data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                const query = `
        INSERT INTO scrapper_image_entity ("parentId", "imageUrl")
        VALUES ($1, $2)
      `;
                for (let img of imagesUrl) {
                    yield queryRunner.manager.query(query, [parentId, img]);
                }
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                console.log('scrapperRepository.saveImages', error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.ScrapperRepository = ScrapperRepository;
//# sourceMappingURL=scrapperRepository.js.map