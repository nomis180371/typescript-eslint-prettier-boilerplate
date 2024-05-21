import { Request, Response } from 'express';
import { AuthService } from '../auth/authService';

export class UserController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('UserController.createUser', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('UserController.getUserById', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.updateUser(req.params.id, req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('UserController.updateUser', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.authService.deleteUser(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('UserController.deleteUser', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
