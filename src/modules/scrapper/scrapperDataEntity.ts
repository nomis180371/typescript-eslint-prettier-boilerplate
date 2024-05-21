import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ScrapperDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  colorId: number;

  @Column({ nullable: true })
  isSuspicious: boolean;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  viewCount: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  feedbackReputation: number;
}
