import express from 'express';
import { ScrappingParamsController } from './scrappingParamsController';

export class ScrappingParamsRoutes {
  private router: express.Router;
  private scrappingParamsController: ScrappingParamsController;

  constructor() {
    this.router = express.Router();
    this.scrappingParamsController = new ScrappingParamsController();

    this.router.get(
      '/getParamsById',
      this.scrappingParamsController.getScrappingParamByType.bind(
        this.scrappingParamsController
      )
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
