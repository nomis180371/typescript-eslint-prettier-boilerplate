import { AlertsRepository } from './alertsRepository';

export class AlertsService {
  public alertsRepository: AlertsRepository;

  constructor() {
    this.alertsRepository = new AlertsRepository();
  }

  public createAlert() {
    try {
      // this.alertsRepository.createAlert()
    } catch (error) {
      console.log('ScrapperService.createAlert');
    }
  }
}
