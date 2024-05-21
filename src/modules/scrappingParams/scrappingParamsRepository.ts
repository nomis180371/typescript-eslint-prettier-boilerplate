import { AppDataSource } from '../../data-source';
import { ParamTypeEnum } from '../../types/scrappingParamsType';
import { ScrappingParamsEntity } from './scrappingParamsEntity';
import { Like } from 'typeorm';

export class ScrappingParamsRepository {
  constructor() {}

  public async getScrappingParamByType(paramType: string) {
    try {
      const paramEnum = ParamTypeEnum[paramType.toUpperCase()];
      if (!paramEnum) throw new Error('Invalid Param');

      const scrappingParamsRepository = AppDataSource.getRepository(
        ScrappingParamsEntity
      );
      const result = await scrappingParamsRepository.find({
        where: { type: paramEnum },
      });
      return result;
    } catch (error) {
      console.log('ScrappingParamsRepository.getScrappingParamByType', error);
      throw error;
    }
  }

  public async getScrappingParamsByParamIdAndSearch(
    paramType: ParamTypeEnum,
    searchStr: string
  ) {
    try {
      const paramEnum = ParamTypeEnum[paramType.toUpperCase()];
      if (!paramEnum) throw new Error('Invalid Param');

      const scrappingParamsRepository = AppDataSource.getRepository(
        ScrappingParamsEntity
      );
      const result = await scrappingParamsRepository.find({
        where: {
          type: paramEnum,
          title: Like(`%${searchStr}%`),
        },
      });
      return result;
    } catch (error) {
      console.log(
        'ScrappingParamsRepository.getScrappingParamsByParamIdAndSearch',
        error
      );
      throw error;
    }
  }
}
