import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { ParamTypeEnum } from '../types/sources';
import { ScrappingParams } from '../entity/params/ScrappingParams';

const getScrappingDataById = async (req: Request, res: Response) => {
  const paramsRepository = await AppDataSource.getRepository(ScrappingParams);
  try {
    const paramType: ParamTypeEnum = req.query.param;
    const parentId: string | null = req.param.parentId || null;
    const result = await paramsRepository.find({
      where: {
        type: paramType,
        parentId: parentId,
      },
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getScrappingDataById,
};
