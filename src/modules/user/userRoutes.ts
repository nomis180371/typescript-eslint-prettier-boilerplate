import express from 'express';
import { UserController } from './userController';
import { authenticateToken } from '../../middleware/authMiddleware';

export class UserRoutes {
  public router: express.Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/create',
      this.userController.createUser.bind(this.userController)
    );
    this.router.get(
      '/',
      authenticateToken,
      this.userController.getUserById.bind(this.userController)
    );
    this.router.put(
      '/',
      this.userController.updateUser.bind(this.userController)
    );
    this.router.delete(
      '/',
      this.userController.deleteUser.bind(this.userController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
