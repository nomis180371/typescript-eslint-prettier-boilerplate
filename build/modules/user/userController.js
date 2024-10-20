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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const authService_1 = require("../auth/authService");
class UserController {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                console.error('UserController.createUser', error);
                res.status(500).json({ error: 'Failed to create user' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.getUserById(req.user.id);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (error) {
                console.error('UserController.getUserById', error);
                res.status(500).json({ error: 'Failed to get user' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.updateUser(req.params.id, req.body);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (error) {
                console.error('UserController.updateUser', error);
                res.status(500).json({ error: 'Failed to update user' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.authService.deleteUser(req.params.id);
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (error) {
                console.error('UserController.deleteUser', error);
                res.status(500).json({ error: 'Failed to delete user' });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map