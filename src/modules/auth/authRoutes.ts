import express from 'express';
import { AuthController } from './authController';

export class AuthRoutes {
  public router: express.Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/login',
      this.authController.authenticateLocal.bind(this.authController)
    );
    this.router.post(
      '/refresh-token',
      this.authController.refreshAccessToken.bind(this.authController)
    );
    this.router.get(
      '/google',
      this.authController.authenticateGoogle.bind(this.authController)
    );
    this.router.get(
      '/google/callback',
      this.authController.googleCallback.bind(this.authController)
    );
    this.router.get(
      '/facebook',
      this.authController.authenticateFacebook.bind(this.authController)
    );
    this.router.get(
      '/facebook/callback',
      this.authController.facebookCallback.bind(this.authController)
    );
    this.router.get(
      '/logout',
      this.authController.logout.bind(this.authController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
