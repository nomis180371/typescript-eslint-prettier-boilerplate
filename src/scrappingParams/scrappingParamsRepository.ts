import { AppDataSource } from '../data-source';
import { ParamTypeEnum } from './scrappingParamsType';
const _ = require('lodash');

export class ScrappingParamsRepository {
  constructor() {}

  public async getScrappingParamByType(paramType: string) {
    try {
      if (_.isNil(ParamTypeEnum[paramType.toUpperCase()]))
        throw new Error('Invalid Param');

      const queryRunner = await AppDataSource.createQueryRunner();
      const query = `
        SELECT *
        FROM scrapping_params
        WHERE type = '${ParamTypeEnum[paramType.toUpperCase()] || ''}'
      `;
      const result = await queryRunner.manager.query(query);
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
      if (_.isNil(ParamTypeEnum[paramType.toUpperCase()]))
        throw new Error('Invalid Param');

      const queryRunner = await AppDataSource.createQueryRunner();
      const query = `
        SELECT *
        FROM scrapping_params
        WHERE type = ${ParamTypeEnum[paramType]}
        AND title like '%${searchStr}%'
      `;
      const result = await queryRunner.manager.query(query);
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
