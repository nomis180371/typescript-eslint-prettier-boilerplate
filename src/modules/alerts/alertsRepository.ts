import { AppDataSource } from '../../data-source';
import { AlertType } from '../../types/alertsTypes';
import { AlertsEntity } from './alertsEntity';

export class AlertsRepository {
  constructor() {}

  public async createAlert(alert: AlertType) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const newAlert = new AlertsEntity();
      newAlert.userId = alert.userId;
      newAlert.channel = alert.channel;
      newAlert.productParams = alert.productParams;
      newAlert.creationDate = new Date();

      await queryRunner.manager.save(newAlert);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('alertsRepository.createAlert', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
