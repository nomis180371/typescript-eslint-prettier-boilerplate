"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
class UserRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new userController_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create', this.userController.createUser.bind(this.userController));
        this.router.get('/', authMiddleware_1.authenticateToken, this.userController.getUserById.bind(this.userController));
        this.router.put('/', this.userController.updateUser.bind(this.userController));
        this.router.delete('/', this.userController.deleteUser.bind(this.userController));
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map