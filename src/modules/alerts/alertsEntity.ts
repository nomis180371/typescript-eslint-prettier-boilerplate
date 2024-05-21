import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IAlertProductParams } from '../../types/alertsTypes';

@Entity()
export class AlertsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  channel: 'discord' | 'mail';

  @Column('jsonb', { nullable: false })
  productParams: IAlertProductParams;

  @Column({ nullable: false })
  creationDate: Date;
}
