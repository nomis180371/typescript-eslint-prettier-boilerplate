import { channel } from 'diagnostics_channel';
import { AppDataSource } from '../data-source';
import { AlertType } from './alertsTypes';

export class AlertsRepository {
  constructor() {}

  public async createAlert(alert: AlertType) {
    const queryRunner = await AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const query = `
          INSERT INTO scrapper_data_entity ("userId", channel, "productParams", "creationDate")
          VALUES ($1, $2, $3, $4)
          RETURNING id;
      `;
      await queryRunner.manager.query(query, [
        alert.userId,
        alert.channel,
        alert.productParams,
        new Date(),
      ]);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('alertsRepository.createAlert', error);
    } finally {
      await queryRunner.release();
    }
  }
}
