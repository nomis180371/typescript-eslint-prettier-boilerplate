import express from 'express';
import { AlertsController } from './alertsController';

export class AlertsRoutes {
  private router: express.Router;
  private alertsController: AlertsController;

  constructor() {
    this.router = express.Router();
    this.alertsController = new AlertsController();

    this.router.post(
      '/alerts/new',
      this.alertsController.createAlert.bind(this.alertsController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
