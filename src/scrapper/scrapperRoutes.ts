import express from 'express';
import { ScrapperController } from './scrapperController';

export class ScrappperRoutes {
  private router: express.Router;
  private scrapperController: ScrapperController;

  constructor() {
    this.router = express.Router();
    this.scrapperController = new ScrapperController();

    this.router.get(
      '/scrape',
      this.scrapperController.startScrapping.bind(this.scrapperController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
