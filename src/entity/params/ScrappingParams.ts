import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { SourcesEnum } from '../../types/sources';
import { ParamTypeEnum } from '../../types/sources';

@Entity()
export class ScrappingParams extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  paramId: string;

  @Column({ type: 'enum', enum: ParamTypeEnum, nullable: false })
  type: ParamTypeEnum;

  @Column({ type: 'enum', enum: SourcesEnum, nullable: false })
  source: SourcesEnum;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: false })
  lastModificationDate: Date;

  @Column({ nullable: true })
  gender: 'F' | 'M' | null;

  @Column({ nullable: true })
  parentId: string | null;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  code: string;
}
