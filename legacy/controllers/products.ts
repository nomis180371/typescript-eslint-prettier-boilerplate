const unescape = require('unescape-js');
import { Request, Response } from 'express';
import { ScrappingParams } from '../scrappingParams/scrappingParamsEntity';
import { ParamTypeEnum, SourcesEnum } from '../types/sources';
import vintedBrandsData from '../data/vinted/brand.json';
import catalogData from '../data/vinted/catalog.json';
import sizesData from '../data/vinted/size.json';
import statusData from '../data/vinted/status.json';
import colorsData from '../data/vinted/color.json';
import { AppDataSource } from '../data-source';

const migrateData = async (req: Request, res: Response) => {
  const { type } = req.body;
  const paramsRepository = await AppDataSource.getRepository(ScrappingParams);
  try {
    if (type === 'brand') {
      for (const brandData of vintedBrandsData) {
        const newBrand = ScrappingParams.create({
          title: unescape(brandData.title),
          paramId: brandData.id.toString(),
          type: ParamTypeEnum.BRAND,
          source: SourcesEnum.VINTED,
          slug: brandData.slug,
          lastModificationDate: new Date(),
        });

        await paramsRepository.save(newBrand);
      }
    } else if (type === 'catalog') {
      // 0 => Womens
      // 1 => Mens
      for (let catalogType of catalogData[1].catalogs) {
        const newType = ScrappingParams.create({
          title: unescape(catalogType.title),
          paramId: catalogType.id.toString(),
          type: ParamTypeEnum.CATALOG,
          source: SourcesEnum.VINTED,
          lastModificationDate: new Date(),
          gender: 'M',
          parentId: null,
        });

        await paramsRepository.save(newType);

        for (let childType of catalogType.catalogs) {
          const newChildType = ScrappingParams.create({
            title: unescape(childType.title),
            paramId: childType.id.toString(),
            type: ParamTypeEnum.CATALOG,
            source: SourcesEnum.VINTED,
            slug: childType.url,
            lastModificationDate: new Date(),
            gender: 'M',
            parentId: catalogType.id.toString(),
          });

          await paramsRepository.save(newChildType);

          for (let grandChildType of childType.catalogs) {
            const newGrandChildType = ScrappingParams.create({
              title: unescape(grandChildType.title),
              paramId: grandChildType.id.toString(),
              type: ParamTypeEnum.CATALOG,
              source: SourcesEnum.VINTED,
              slug: childType.url,
              lastModificationDate: new Date(),
              gender: 'M',
              parentId: childType.id.toString(),
            });

            await paramsRepository.save(newGrandChildType);
          }
        }
      }
    } else if (type === 'sizes') {
      for (let size of sizesData) {
        if (size.sizes.length > 0) {
          const sizeItem = ScrappingParams.create({
            title: unescape(size.description),
            paramId: size.id.toString(),
            type: ParamTypeEnum.SIZE,
            source: SourcesEnum.VINTED,
            lastModificationDate: new Date(),
          });

          await paramsRepository.save(sizeItem);

          for (let childSize of size.sizes) {
            const childSizeItem = ScrappingParams.create({
              title: unescape(childSize.title),
              paramId: childSize.id.toString(),
              type: ParamTypeEnum.SIZE,
              source: SourcesEnum.VINTED,
              lastModificationDate: new Date(),
              parentId: size.id.toString(),
            });

            await paramsRepository.save(childSizeItem);
          }
        }
      }
    } else if (type === 'status') {
      for (let status of statusData) {
        const newStatus = ScrappingParams.create({
          title: unescape(status.title),
          paramId: status.id.toString(),
          type: ParamTypeEnum.STATUS,
          source: SourcesEnum.VINTED,
          lastModificationDate: new Date(),
          parentId: status.id.toString(),
          order: status.order,
        });

        await paramsRepository.save(newStatus);
      }
    } else if (type === 'color') {
      for (let color of colorsData) {
        const newColor = ScrappingParams.create({
          title: unescape(color.title),
          paramId: color.id.toString(),
          type: ParamTypeEnum.COLOR,
          source: SourcesEnum.VINTED,
          lastModificationDate: new Date(),
          code: color.code,
        });

        await paramsRepository.save(newColor);
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
