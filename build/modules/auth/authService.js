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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userEntity_1 = require("../user/userEntity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
class AuthService {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
            const userWithHashedPassword = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            const user = userEntity_1.User.create(userWithHashedPassword);
            return yield user.save();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userEntity_1.User.findOneBy({ id: userId });
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateData.password) {
                updateData.password = yield bcryptjs_1.default.hash(updateData.password, 10);
            }
            yield userEntity_1.User.update(userId, updateData);
            return yield userEntity_1.User.findOneBy({ id: userId });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userEntity_1.User.delete(userId);
            return result.affected !== 0;
        });
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map