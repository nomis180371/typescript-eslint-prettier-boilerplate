import express from 'express';
import { ScrappingParamsController } from './scrappingParamsController';

export class ScrappingParamsRoutes {
  public router: express.Router;
  private scrappingParamsController: ScrappingParamsController;

  constructor() {
    this.router = express.Router();
    this.scrappingParamsController = new ScrappingParamsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/:id',
      this.scrappingParamsController.getScrappingParamByType.bind(
        this.scrappingParamsController
      )
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
