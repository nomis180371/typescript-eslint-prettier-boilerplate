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
const user_1 = require("../entity/user");
const data_source_1 = require("../data-source");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
        return res
            .status(409)
            .json({ message: 'Username or email already taken.' });
    }
    const newUser = user_1.User.create({ username, email, password });
    yield newUser.save();
    return res.status(201).json({ message: 'User created successfully.' });
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    const userById = yield userRepository.findOne({
        where: { id: req.params.id },
    });
    if (!userById)
        return res.sendStatus(404);
    return res.status(200).send(userById);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield data_source_1.AppDataSource.getRepository(user_1.User);
    const userToUpdate = yield userRepository.findOne({
        where: { id: req.params.id },
    });
    if (!userToUpdate)
        return res.sendStatus(404);
    userToUpdate.username = req.body.username;
    userToUpdate.email = req.body.email;
    userToUpdate.password = req.body.password;
    const result = yield userRepository.save(userToUpdate);
    if (!result)
        return res.sendStatus(500);
    return res.sendStatus(200);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield data_source_1.AppDataSource.getRepository(user_1.User);
    const userToRemove = yield userRepository.findOne({
        where: { id: req.params.id },
    });
    const result = yield userRepository.remove(userToRemove);
    if (!result)
        return res.sendStatus(500);
    return res.sendStatus(200);
});
module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.js.map