import { Request, Response } from 'express';
// import { ScrappingParamsRepository } from '../repositories/scrappingParamsRepository';

export class getScrappingParamsController {
  static async getScrappingParamByType(req: Request, res: Response) {
    try {
      const result = await ScrappingParamsRepository.getScrappingParamByType(
        req.query.param
      );
      return res.status(200).send(result);
    } catch (error) {
      console.log(
        'getScrappingParamsController.getScrappingParamByType',
        error
      );
      return res.status(500).send(error);
    }
  }
}
