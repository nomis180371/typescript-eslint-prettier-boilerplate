import { ScrappingParams } from '../shit/scrappingParams/scrappingParamsEntity';
import { ParamTypeEnum, SourcesEnum } from '../types/sources';
import vintedBrandsData from '../data/vinted/brand.json';
import catalogData from '../data/vinted/catalog.json';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

const migrateData = async (req: Request, res: Response) => {
  const { type } = req.body;
  const vintedBrandParamRepository = await AppDataSource.getRepository(
    ScrappingParams
  );
  try {
    if (type === 'brand') {
      for (const brandData of vintedBrandsData) {
        const newBrand = ScrappingParams.create({
          title: brandData.title,
          paramId: brandData.id.toString(),
          type: ParamTypeEnum.BRAND,
          source: SourcesEnum.VINTED,
          slug: brandData.slug,
          lastModificationDate: new Date(),
        });

        await vintedBrandParamRepository.save(newBrand);
      }
    }

    console.log('Migration des données terminée avec succès.');
    return res.sendStatus(200);
  } catch (error) {
    console.error('Erreur lors de la migration des données :', error);
  }
};

module.exports = {
  migrateData,
};
