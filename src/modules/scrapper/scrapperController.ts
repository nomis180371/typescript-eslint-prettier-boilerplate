import { ScrapperService } from './scrapperService';

export class ScrapperController {
  public scrapperService: ScrapperService;

  constructor() {
    this.scrapperService = new ScrapperService();
  }

  public async startScrapping() {
    try {
      console.log('Start scrapping');
      await this.scrapperService.startScraping();
    } catch (error) {
      console.log('ScrappingController.startScrapping', error);
    }
  }
}

export const scrapperController = new ScrapperController();
