"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.authController = new authController_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', this.authController.authenticateLocal.bind(this.authController));
        this.router.post('/refresh-token', this.authController.refreshAccessToken.bind(this.authController));
        this.router.get('/google', this.authController.authenticateGoogle.bind(this.authController));
        this.router.get('/google/callback', this.authController.googleCallback.bind(this.authController));
        this.router.get('/facebook', this.authController.authenticateFacebook.bind(this.authController));
        this.router.get('/facebook/callback', this.authController.facebookCallback.bind(this.authController));
        this.router.get('/logout', this.authController.logout.bind(this.authController));
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=authRoutes.js.map