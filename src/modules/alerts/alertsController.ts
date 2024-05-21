import { Request, Response } from 'express';
import { AlertsService } from './alertsService';

export class AlertsController {
  public alertsService: AlertsService;

  constructor() {
    this.alertsService = new AlertsService();
  }

  public async createAlert(req: Request, res: Response) {
    try {
      const result = await this.alertsService.createAlert();
      return res.status(200).send(result);
    } catch (error) {
      console.log('ScrappingController.startScrapping', error);
      return res.status(500).send(error);
    }
  }
}
