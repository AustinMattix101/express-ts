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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { genSalt, hash, compare } = bcryptjs_1.default;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign } = jsonwebtoken_1.default;
const node_2fa_1 = __importDefault(require("node-2fa"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
;
const UserSchema = new mongoose_1.Schema({
    altid: {
        type: String,
        immutable: true,
        minlength: [10, " Alternative ID should be minimum of 10 characters "],
        required: [true, " Need for invoke alternative access! "],
        unique: true,
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, " Please povide a username! "],
        minlength: [4, " Name should be minimum of 4 characters "],
        unique: true,
    },
    email: {
        type: String,
        required: [true, " Please add a password "],
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, " Please provide a valid email! "
        ]
    },
    password: {
        type: String,
        required: [true, " Please add a password "],
        minlength: [8, " Password should be minimum of 8 characters "],
        select: false
    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [false, " Wish to change user role please go into database! "],
        default: "normal"
    },
    OTPToken: String,
    OTPTokenExpire: Date,
    verifiedEmail: Boolean,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifiedPassword: Boolean,
    TwoFAKey: Object,
    verifiedTwoFA: Boolean,
    validatedTwoFA: Boolean,
    validationResetTime: Date,
    preferedTwoFA: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield genSalt(10);
        this.password = yield hash(this.password, salt);
        next();
    });
});
UserSchema.methods.matchPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield compare(password, this.password);
    });
};
UserSchema.methods.setInit = function (_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.verifiedEmail) {
                return next(new errorResponse_1.default(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
            }
            else {
                if (!this.preferedTwoFA) {
                    const token = this.getSignedToken();
                    const { _doc } = this;
                    const { _id, altid, password, TwoFAKey } = _doc, data = __rest(_doc, ["_id", "altid", "password", "TwoFAKey"]);
                    yield res.status(201).json({
                        success: true,
                        status: `LOGGED`,
                        message: `You have been logged in successfully!`,
                        token,
                        data,
                    });
                }
                else {
                    if (!this.validationResetTime) {
                        return next(new errorResponse_1.default(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 422));
                    }
                    else {
                        if (!this.validatedTwoFA) {
                            return next(new errorResponse_1.default(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 422));
                        }
                        else {
                            if (this.validationResetTime < Date.now()) {
                                return next(new errorResponse_1.default(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 422));
                            }
                            else {
                                const token = this.getSignedToken();
                                const { _doc } = this;
                                const { _id, altid, password, TwoFAKey } = _doc, data = __rest(_doc, ["_id", "altid", "password", "TwoFAKey"]);
                                yield res.status(201).json({
                                    success: true,
                                    status: `SIGNED`,
                                    message: `You have been signed in successfully!`,
                                    token,
                                    data
                                });
                            }
                        }
                    }
                }
            }
        }
        catch (error) {
            console.log(`Error: ${error}`);
            next(error);
        }
    });
};
UserSchema.methods.getSignedToken = function () {
    return sign({ id: this._id }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.JWT_EXPIRE });
};
UserSchema.methods.getOTPConfirmEmail = function () {
    return __awaiter(this, void 0, void 0, function* () {
        function reverseString(str) {
            return str.slice('').reverse('').join('');
        }
        const otpMath = `${Math.floor(Math.random() * 99999 + 100000)}`;
        const otpString = String(otpMath);
        const randomOTP = [...String(otpString)];
        const n1 = (0, crypto_1.randomInt)(1, 10);
        const n2 = (0, crypto_1.randomInt)(1, 10);
        randomOTP[0] = String(n1);
        randomOTP[5] = String(n2);
        const OTP = yield reverseString(randomOTP);
        const ParseOTP = parseInt(OTP, undefined);
        const saltRounds = yield genSalt(10);
        const hashedOTP = yield hash(OTP, saltRounds);
        this.OTPToken = hashedOTP;
        this.OTPTokenExpire = Date.now() + 10 * (60 * 1000);
        return ParseOTP;
    });
};
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = (0, crypto_1.randomBytes)(20).toString("hex");
    this.resetPasswordToken = (0, crypto_1.createHash)("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);
    return resetToken;
};
UserSchema.methods.getTwoFAKey = function () {
    const tempKey = node_2fa_1.default.generateSecret({ name: `${process.env.BRAND_NAME}`, account: this.username });
    this.TwoFAKey = tempKey;
    return tempKey;
};
UserSchema.methods.verifyTwoFAToken = function (token) {
    const result = node_2fa_1.default.verifyToken(this.TwoFAKey.secret, token);
    return result === null || result === void 0 ? void 0 : result.delta;
};
UserSchema.methods.validateTwoFAToken = function (token) {
    const result = node_2fa_1.default.verifyToken(this.TwoFAKey.secret, token);
    return result === null || result === void 0 ? void 0 : result.delta;
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map