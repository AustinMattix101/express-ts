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
exports.InitpreferedTwoFAOption = exports.InitOnlyEmailConfirmation = void 0;
const User_1 = __importDefault(require("../models/User"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function InitOnlyEmailConfirmation(req, _res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const user = yield User_1.default.findOne({ altid });
        const verifiedEmail = user === null || user === void 0 ? void 0 : user.verifiedEmail;
        try {
            if (!verifiedEmail) {
                return next(new errorResponse_1.default(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
            }
            else {
                next();
            }
        }
        catch (error) {
            if (typeof user == null)
                return next(error);
            next(error);
        }
    });
}
exports.InitOnlyEmailConfirmation = InitOnlyEmailConfirmation;
function InitpreferedTwoFAOption(req, _res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const user = yield User_1.default.findOne({ altid });
        const preferedTwoFA = user === null || user === void 0 ? void 0 : user.preferedTwoFA;
        const validationResetTime = user === null || user === void 0 ? void 0 : user.validationResetTime;
        const validatedTwoFA = user === null || user === void 0 ? void 0 : user.validatedTwoFA;
        try {
            if (!preferedTwoFA) {
                next();
            }
            else {
                if (!validationResetTime) {
                    return next(new errorResponse_1.default(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 401));
                }
                else {
                    if (!validatedTwoFA) {
                        return next(new errorResponse_1.default(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 401));
                    }
                    else {
                        if (validationResetTime < Date.now()) {
                            return next(new errorResponse_1.default(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 401));
                        }
                        else {
                            next();
                        }
                    }
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.InitpreferedTwoFAOption = InitpreferedTwoFAOption;
//# sourceMappingURL=init.js.map