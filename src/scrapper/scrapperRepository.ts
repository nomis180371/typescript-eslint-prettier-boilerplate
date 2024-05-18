import { AppDataSource } from '../data-source';
import { IScrapperData } from './scrapperTypes';

export class ScrapperRepository {
  constructor() {}

  public async saveProduct(product: IScrapperData) {
    const queryRunner = await AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const query = `
            INSERT INTO scrapper_data_entity (link, date, price, currency, title, description, brand, type, "colorId", "isSuspicious", size, "viewCount", "feedbackReputation")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id;
        `;
      const result = await queryRunner.manager.query(query, [
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
      await queryRunner.commitTransaction();
      if (result[0].id) this.saveImages(result[0].id, product.imagesUrl);
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Erreur lors de l'insertion du produit :", error);
    } finally {
      await queryRunner.release();
    }
  }

  public async checkProductExistance(product: IScrapperData): Promise<boolean> {
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

    const queryRunner = await AppDataSource.createQueryRunner();

    try {
      const result = await queryRunner.manager.query(query, [
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
    } catch (error) {
      console.error('scrapperRepository.checkProductExistance', error);
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  private async saveImages(parentId: string, imagesUrl: string[]) {
    const queryRunner = await AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const query = `
        INSERT INTO scrapper_image_entity ("parentId", "imageUrl")
        VALUES ($1, $2)
      `;
      for (let img of imagesUrl) {
        await queryRunner.manager.query(query, [parentId, img]);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('scrapperRepository.saveImages', error);
    } finally {
      await queryRunner.release();
    }
  }
}
