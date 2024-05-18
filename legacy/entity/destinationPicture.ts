import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Destination } from './destination';

@Entity()
export class DestinationPicture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ type: 'int', nullable: true })
  width: number;

  @OneToOne(() => Destination)
  @JoinColumn()
  destination: Destination;
}
