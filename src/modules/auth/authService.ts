import jwt from 'jsonwebtoken';
import { User } from '../user/userEntity';
import bcrypt from 'bcryptjs';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export class AuthService {
  public async createUser(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    } as User;
    const user = User.create(userWithHashedPassword);
    return await user.save();
  }

  public async getUserById(userId: string): Promise<User | null> {
    return await User.findOneBy({ id: userId });
  }

  public async updateUser(
    userId: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await User.update(userId, updateData);
    return await User.findOneBy({ id: userId });
  }

  public async deleteUser(userId: string): Promise<boolean> {
    const result = await User.delete(userId);
    return result.affected !== 0;
  }

  public generateAccessToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
  }

  public generateRefreshToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
  }

  public verifyAccessToken(token: string): any {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }

  public verifyRefreshToken(token: string): any {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }
}
