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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    const result = yield user.save();
    if (result)
        return res.status(200).send(result.id);
    else
        return res.status(400);
});
module.exports = {
    createUser,
};
//# sourceMappingURL=user.js.map