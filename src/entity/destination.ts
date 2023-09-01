import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'real', nullable: true })
  latitude: string;

  @Column({ type: 'real', nullable: true })
  longitude: string;
}
