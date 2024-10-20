"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
const authService_1 = require("./authService");
const userEntity_1 = require("../user/userEntity");
const authService = new authService_1.AuthService();
class AuthController {
    authenticateLocal(req, res, next) {
        passport_1.default.authenticate('local', (err, user, info) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            const accessToken = authService.generateAccessToken(user);
            const refreshToken = authService.generateRefreshToken(user);
            res.json({ accessToken, refreshToken });
        }))(req, res, next);
    }
    refreshAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token is required' });
            }
            try {
                const userData = authService.verifyRefreshToken(refreshToken);
                const user = yield userEntity_1.User.findOneBy({ id: userData.id });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid refresh token' });
                }
                const newAccessToken = authService.generateAccessToken(user);
                const newRefreshToken = authService.generateRefreshToken(user);
                res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            }
            catch (error) {
                res.status(401).json({ message: 'Invalid refresh token' });
            }
        });
    }
    authenticateGoogle(req, res, next) {
        passport_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }
    googleCallback(req, res, next) {
        passport_1.default.authenticate('google', (err, user) => {
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
    authenticateFacebook(req, res, next) {
        passport_1.default.authenticate('facebook', { scope: ['email'] })(req, res, next);
    }
    facebookCallback(req, res, next) {
        passport_1.default.authenticate('facebook', (err, user) => {
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
    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map