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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_local_1 = require("passport-local");
const userEntity_1 = require("../user/userEntity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userEntity_1.User.findOneBy({ id });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
// Local strategy
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userEntity_1.User.findOneBy({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// Google strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let user = yield userEntity_1.User.findOneBy({ googleId: profile.id });
        if (!user) {
            user = userEntity_1.User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName,
                lastName: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName,
            });
            yield user.save();
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// Facebook strategy
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'],
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        let user = yield userEntity_1.User.findOneBy({ facebookId: profile.id });
        if (!user) {
            user = userEntity_1.User.create({
                facebookId: profile.id,
                email: profile.emails[0].value,
                firstName: (_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName,
                lastName: (_d = profile.name) === null || _d === void 0 ? void 0 : _d.familyName,
            });
            yield user.save();
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
//# sourceMappingURL=passportConfig.js.map