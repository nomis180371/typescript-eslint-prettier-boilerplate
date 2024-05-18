import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ScrappingParams } from '../scrappingParams/scrappingParamsEntity';
import { ParamTypeEnum } from '../types/sources';

export class ScrappingParamsRepository {
  static async getScrappingParamByType(paramType: ParamTypeEnum) {
    try {
      return await AppDataSource.getRepository(ScrappingParams)
        .createQueryBuilder('params')
        .where('params.type', ParamTypeEnum[paramType]);
    } catch (error) {
      console.log('ScrappingParamsRepository.getScrappingParamByType', error);
    }
  }

  static async getScrappingParamsByParamIdAndSearch(
    paramType: ParamTypeEnum,
    searchStr: string
  ) {
    try {
      return await AppDataSource.getRepository(ScrappingParams)
        .createQueryBuilder('params')
        .where('params.type', ParamTypeEnum[paramType])
        .andWhere(`params.title ILIKE :searchStr`, {
          searchStr: `%${searchStr}%`,
        })
        .getMany();
    } catch (error) {}
  }
}
