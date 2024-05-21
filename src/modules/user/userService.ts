import { UserRepository } from './userRepository';
import { User } from './userEntity';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    return await this.userRepository.createUser(userData);
  }

  public async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }

  public async updateUser(
    userId: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    return await this.userRepository.updateUser(userId, updateData);
  }

  public async deleteUser(userId: string): Promise<boolean> {
    return await this.userRepository.deleteUser(userId);
  }
}
