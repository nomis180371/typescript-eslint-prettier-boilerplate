import { AppDataSource } from '../../data-source';
import { User } from './userEntity';

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  public async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  public async getUserById(userId: string): Promise<User | null> {
    return await this.repository.findOneBy({ id: userId });
  }

  public async updateUser(
    userId: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    await this.repository.update(userId, updateData);
    return await this.repository.findOneBy({ id: userId });
  }

  public async deleteUser(userId: string): Promise<boolean> {
    const result = await this.repository.delete(userId);
    return result.affected !== 0;
  }
}
