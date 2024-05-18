import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, Length } from 'class-validator';

interface IUser {
  username: string;
  email: string;
  password: string;
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @Column()
  @Length(7, 100)
  email: string;

  @Column()
  @Length(8, 100)
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  static async createUser(data: IUser): Promise<User> {
    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    return user.save();
  }
}
