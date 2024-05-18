import { Request, Response } from 'express';
import { ScrappingParamsRepository } from './scrappingParamsRepository';

export class ScrappingParamsController {
  public scrappingParamsRepository: ScrappingParamsRepository;

  constructor() {
    this.scrappingParamsRepository = new ScrappingParamsRepository();
  }

  public async getScrappingParamByType(req: Request, res: Response) {
    try {
      const result = await this.scrappingParamsRepository.getScrappingParamByType(
        req.query.param
      );
      console.log('getScrappingParamByType', req.query.param);
      return res.status(200).send(result);
    } catch (error) {
      console.log('ScrappingParamsController.getScrappingParamByType', error);
      return res.status(500).send(error);
    }
  }
}
