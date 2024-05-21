import { AppDataSource } from '../../data-source';
import { IScrapperData } from '../../types/scrapperTypes';
import { ScrapperDataEntity } from './scrapperDataEntity';
import { ScrapperImageEntity } from './scrapperImageEntity';

export class ScrapperRepository {
  constructor() {}

  public async saveProduct(product: IScrapperData) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const scrapperData = new ScrapperDataEntity();
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

      const result = await queryRunner.manager.save(scrapperData);
      await queryRunner.commitTransaction();

      await this.saveImages(result.id, product.imagesUrl);

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Erreur lors de l'insertion du produit :", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async checkProductExistance(product: IScrapperData): Promise<boolean> {
    try {
      const result = await AppDataSource.getRepository(
        ScrapperDataEntity
      ).findOne({
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
    } catch (error) {
      console.error('scrapperRepository.checkProductExistance', error);
      return false;
    }
  }

  private async saveImages(parentId: string, imagesUrl: string[]) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const img of imagesUrl) {
        const scrapperImage = new ScrapperImageEntity();
        scrapperImage.parentId = parentId;
        scrapperImage.imageUrl = img;
        await queryRunner.manager.save(scrapperImage);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('scrapperRepository.saveImages', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
