import { Request, Response } from 'express';
import passport from 'passport';
import { AuthService } from './authService';
import { User } from '../user/userEntity';

const authService = new AuthService();

export class AuthController {
  public authenticateLocal(req: Request, res: Response, next: Function) {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
    })(req, res, next);
  }

  public async refreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
    try {
      const userData = authService.verifyRefreshToken(refreshToken);
      const user = await User.findOneBy({ id: userData.id });
      if (!user) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
      const newAccessToken = authService.generateAccessToken(user);
      const newRefreshToken = authService.generateRefreshToken(user);
      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  }

  public authenticateGoogle(req: Request, res: Response, next: Function) {
    passport.authenticate('google', { scope: ['profile', 'email'] })(
      req,
      res,
      next
    );
  }

  public googleCallback(req: Request, res: Response, next: Function) {
    passport.authenticate('google', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
    })(req, res, next);
  }

  public authenticateFacebook(req: Request, res: Response, next: Function) {
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
  }

  public facebookCallback(req: Request, res: Response, next: Function) {
    passport.authenticate('facebook', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
    })(req, res, next);
  }

  public logout(req: Request, res: Response) {
    req.logout();
    res.redirect('/');
  }
}
