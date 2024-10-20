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
exports.UserRepository = void 0;
const data_source_1 = require("../../data-source");
const userEntity_1 = require("./userEntity");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.repository.create(user);
            return yield this.repository.save(newUser);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOneBy({ id: userId });
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(userId, updateData);
            return yield this.repository.findOneBy({ id: userId });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(userId);
            return result.affected !== 0;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map