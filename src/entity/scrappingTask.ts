import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ScrappingQueryParams } from '../types/params';

@Entity()
export class ScrappingTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  isActive: boolean;

  @Column({ nullable: false })
  params: ScrappingQueryParams[];

  @Column({ nullable: true })
  errors: string[];
}
