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
exports.postTwoFAValidate = exports.postTwoFAVerify = exports.postTwoFARegister = exports.getTwoFAOff = exports.getTwoFAOn = exports.getTwoFA = void 0;
const User_1 = __importDefault(require("../models/User"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const getTwoFA = (_req, res, _next) => {
    res.status(200).json({ message: `Welcome to the two factor authentication!` });
};
exports.getTwoFA = getTwoFA;
const getTwoFAOn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
    try {
        yield User_1.default.findOneAndUpdate({ altid }, { $set: { preferedTwoFA: true } }, { new: true });
        yield res.status(201).json({ success: true, status: `ON`, message: `You have been turn on successfully for 2FA [Two Factor Authentication]!`, data: { email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email, username: (_c = req.user) === null || _c === void 0 ? void 0 : _c.username } });
    }
    catch (error) {
        next(error);
    }
});
exports.getTwoFAOn = getTwoFAOn;
const getTwoFAOff = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const altid = (_d = req.user) === null || _d === void 0 ? void 0 : _d.altid;
    try {
        yield User_1.default.findOneAndUpdate({ altid }, { $set: { preferedTwoFA: false } });
        yield User_1.default.findOneAndUpdate({ altid }, { $set: { TwoFAKey: undefined } });
        yield User_1.default.findOneAndUpdate({ altid }, { $set: { verifiedTwoFA: undefined } });
        yield User_1.default.findOneAndUpdate({ altid }, { $set: { validatedTwoFA: undefined } });
        res.status(201).json({ success: true, status: `OFF`, message: `You have been turn off successfully for 2FA [Two Factor Authentication]!`, data: { email: (_e = req.user) === null || _e === void 0 ? void 0 : _e.email, username: (_f = req.user) === null || _f === void 0 ? void 0 : _f.username } });
    }
    catch (error) {
        next(error);
    }
});
exports.getTwoFAOff = getTwoFAOff;
const postTwoFARegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const altid = (_g = req.user) === null || _g === void 0 ? void 0 : _g.altid;
    const user = yield User_1.default.findOne({ altid });
    try {
        const tempKey = user === null || user === void 0 ? void 0 : user.getTwoFAKey();
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield res.status(201).json({ success: true, status: `CREATED`, key: tempKey === null || tempKey === void 0 ? void 0 : tempKey.secret, qr: tempKey === null || tempKey === void 0 ? void 0 : tempKey.qr, uri: tempKey === null || tempKey === void 0 ? void 0 : tempKey.uri, data: `Email: ${user === null || user === void 0 ? void 0 : user.email} Username: ${user === null || user === void 0 ? void 0 : user.username}` });
        user.verifiedTwoFA = undefined;
        user.validatedTwoFA = undefined;
        yield (user === null || user === void 0 ? void 0 : user.save());
    }
    catch (error) {
        next(new errorResponse_1.default(`Generating the key unsuccessfully!`, 500));
    }
});
exports.postTwoFARegister = postTwoFARegister;
const postTwoFAVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const altid = (_h = req.user) === null || _h === void 0 ? void 0 : _h.altid;
    const { token } = req.body;
    const user = yield User_1.default.findOne({ altid });
    try {
        if (!token)
            return next(new errorResponse_1.default(`Please provide your token to continue...`, 400));
        const delta = user === null || user === void 0 ? void 0 : user.verifyTwoFAToken(token);
        if (delta > 0 || delta < 0) {
            user.verifiedTwoFA = false;
            yield (user === null || user === void 0 ? void 0 : user.save());
            return next(new errorResponse_1.default(`Oh bad request!, your token is not been verified! Ensure that you enter correctly or token is expired: ${delta} minute(s).`, 401));
        }
        else {
            user.verifiedTwoFA = true;
            user.validatedTwoFA = undefined;
            user.validationResetTime = undefined;
            yield (user === null || user === void 0 ? void 0 : user.save());
            yield res.status(201).json({ success: true, status: `VERIFIED`, message: `Congratulation, your token is been verified!` });
        }
    }
    catch (error) {
        next(new errorResponse_1.default(`Verification of the token unsuccessfully! Make sure you have been checked your token correctly`, 500));
    }
    ;
});
exports.postTwoFAVerify = postTwoFAVerify;
const postTwoFAValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token } = req.body;
    const user = yield User_1.default.findOne({ email });
    try {
        if (!email)
            return next(new errorResponse_1.default(`Please provide your email to continue...`, 400));
        if (!token)
            return next(new errorResponse_1.default(`Please provide your token to continue...`, 400));
        if (!(user === null || user === void 0 ? void 0 : user.verifiedTwoFA)) {
            user.validatedTwoFA = false;
            yield (user === null || user === void 0 ? void 0 : user.save());
            return next(new errorResponse_1.default(`Validation is broken! Ensure that you have been verify your 2FA token yet to continue...!`, 403));
        }
        const delta = user.validateTwoFAToken(token);
        if (delta > 0 || delta < 0) {
            user.validatedTwoFA = false;
            yield user.save();
            return next(new errorResponse_1.default(`Oh bad request!, your token is not been validated! Ensure that you enter correctly or token is expired: ${delta} minute(s).`, 401));
        }
        else {
            user.validatedTwoFA = true;
            user.validationResetTime = (Date.now() + 7 * 24 * 60 * (60 * 1000));
            yield user.save();
            yield res.status(201).json({ success: true, status: `VALIDATED`, message: `Congratulation, your Validation is been passed!` });
        }
    }
    catch (error) {
        next(new errorResponse_1.default(`Validation of the token unsuccessfully! Make sure you have been checked your token correctly`, 500));
    }
    ;
});
exports.postTwoFAValidate = postTwoFAValidate;
//# sourceMappingURL=TwoFA.js.map