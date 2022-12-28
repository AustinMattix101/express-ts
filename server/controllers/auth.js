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
exports.changeUsername = exports.findEmailByUsername = exports.changeEmail = exports.deleteAccountByUsername = exports.altPasswordConfirm = exports.verifyEmail = exports.sendEmailConfirm = exports.resetpassword = exports.forgotpassword = exports.login = exports.register = exports.getHello = void 0;
const uuid_1 = require("uuid");
const crypto_1 = require("crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { compare } = bcryptjs_1.default;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const profile_1 = require("./profile");
const emailTemplate_1 = require("../middlewares/emailTemplate");
function getHello(_req, res) {
    res.json({ message: `Welcome to Camunited Auth API!` });
}
exports.getHello = getHello;
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (0, uuid_1.v4)();
        const _a = req.body, { username, email, password, accepttos } = _a, other = __rest(_a, ["username", "email", "password", "accepttos"]);
        try {
            if (!username || !email || !password)
                return next(new errorResponse_1.default(`Please provide account detail in order to create a new account!`, 400));
            if (!accepttos || accepttos === false)
                return next(new errorResponse_1.default(`Please accept our terms an privacy policy in order to create a new account!`, 400));
            const user = yield User_1.default.create({
                altid,
                username,
                email,
                password
            });
            const profile = yield Profile_1.default.create(Object.assign({ altid,
                username,
                accepttos }, other));
            const message = (0, emailTemplate_1.tRegister)(user.username);
            console.log(`CreatedCongratulations: ${message}`);
            (0, sendEmail_1.default)({
                to: user.email,
                subject: "Congratulations, Account has been created!",
                text: message
            });
            yield res.status(201).json({
                success: true,
                status: `CREATED`,
                message: `Account Create successfully!`,
                data: {
                    email: user.email,
                    username: user.username,
                }
            });
            console.log(`User Register:
        Account Data: ${user},
        Profile Data: ${profile}`);
        }
        catch (error) {
            yield User_1.default.deleteOne({ altid });
            yield Profile_1.default.deleteOne({ altid });
            next(error);
        }
    });
}
exports.register = register;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new errorResponse_1.default("Please provide an email and password", 400));
        try {
            const user = yield User_1.default.findOne({ email }).select("+password");
            if (!user)
                return next(new errorResponse_1.default(`Log Email Not Found! [ Invalid credentials]: ${email}`, 401));
            const isMatch = yield user.matchPassword(password);
            if (!isMatch)
                return next(new errorResponse_1.default("Log Password incorrect! [Invalid credentials]", 401));
            yield user.setInit(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function forgotpassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                return next(new errorResponse_1.default(`Email could not be found! Email: ${email}`, 404));
            }
            else {
                if (!user.verifiedEmail) {
                    return next(new errorResponse_1.default(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
                }
                else {
                    const resetToken = user.getResetPasswordToken();
                    yield user.save();
                    const message = (0, emailTemplate_1.tForgotpassword)(resetToken);
                    console.log(`ResetPasswordEmailToken: ${message}`);
                    try {
                        yield (0, sendEmail_1.default)({
                            to: user.email,
                            subject: "Password Reset Request",
                            text: message
                        });
                        yield res.status(201).json({
                            success: true,
                            status: `PENDING`,
                            message: `Reset Password Email have been Sent to Email: ${user.email}!`,
                            data: { email: user.email }
                        });
                    }
                    catch (error) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        yield user.save();
                        return next(new errorResponse_1.default("Email could not be send!", 500));
                    }
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.forgotpassword = forgotpassword;
function resetpassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const resetPasswordToken = (0, crypto_1.createHash)("sha256").update(req.params.resetToken).digest("hex");
        function sendEmailHelper(user) {
            const message = (0, emailTemplate_1.tResetpassword)(user.username);
            console.log(`PasswordResetCongratulations: ${message}`);
            return (0, sendEmail_1.default)({
                to: user.email,
                subject: "Congratulations, Your Password has been reseted!",
                text: message
            });
        }
        try {
            const user = yield User_1.default.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });
            if (!user) {
                return next(new errorResponse_1.default("Error: [Invalid Reset Token!] Make sure your token is valid!", 400));
            }
            else {
                if (!user.verifiedEmail) {
                    return next(new errorResponse_1.default(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
                }
                else {
                    if (!user.preferedTwoFA) {
                        user.password = req.body.password;
                        user.verifiedPassword = undefined;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        yield user.save();
                        sendEmailHelper(user);
                        yield res.status(201).json({
                            success: true,
                            status: `RESETED`,
                            message: `Password Reseted Successfully on Email ${user.email}`,
                            data: { email: user.email }
                        });
                    }
                    else {
                        if (!user.validationResetTime) {
                            return next(new errorResponse_1.default(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 401));
                        }
                        else {
                            if (!user.validatedTwoFA) {
                                return next(new errorResponse_1.default(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 401));
                            }
                            else {
                                if (user.validationResetTime < new Date(Date.now())) {
                                    return next(new errorResponse_1.default(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 401));
                                }
                                else {
                                    user.password = req.body.password;
                                    user.verifiedPassword = undefined;
                                    user.resetPasswordToken = undefined;
                                    user.resetPasswordExpire = undefined;
                                    yield user.save();
                                    sendEmailHelper(user);
                                    yield res.status(201).json({
                                        success: true,
                                        status: `RESETED`,
                                        message: `Password Reseted Successfully on Email ${user.email}`,
                                        data: { email: user.email }
                                    });
                                }
                            }
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
exports.resetpassword = resetpassword;
function sendEmailConfirm(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        try {
            if (!email)
                return next(new errorResponse_1.default(`Please provide a email address to get an email of confirmation!`, 400));
            if (!user)
                return next(new errorResponse_1.default(`Email you given not found! Email: ${email}`, 404));
            if (user.verifiedEmail)
                return next(new errorResponse_1.default(`You Email confirmation was passed! [Configuraton is true]`, 403));
            const OTP = yield user.getOTPConfirmEmail().toString();
            console.log(`OTP:`, OTP);
            yield user.save();
            const message = (0, emailTemplate_1.tSendEmailConfirm)(OTP);
            console.log(`OTPConfirmEmail: ${message}`);
            yield (0, sendEmail_1.default)({
                to: user.email,
                subject: "Email Confirmation Request",
                text: message
            });
            yield res.status(201).json({
                success: true,
                status: `PENDING`,
                message: `Email Confirmation have been Sent to ${user.email}`,
                data: { email: user.email }
            });
        }
        catch (error) {
            user.OTPToken = undefined;
            user.OTPTokenExpire = undefined;
            yield (user === null || user === void 0 ? void 0 : user.save());
            next(error);
        }
    });
}
exports.sendEmailConfirm = sendEmailConfirm;
function verifyEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token, email } = req.body;
        try {
            if (!token || !email) {
                return next(new errorResponse_1.default(`Please provide an email and confirm token!`, 400));
            }
            else {
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return next(new errorResponse_1.default("Email not found! Make sure your email is correct!!", 400));
                }
                else {
                    if (user.verifiedEmail) {
                        return next(new errorResponse_1.default(`You Email confirmation was passed! [Configuraton is true]`, 403));
                    }
                    else {
                        if (user.OTPTokenExpire === undefined || user.OTPTokenExpire < new Date(Date.now())) {
                            return next(new errorResponse_1.default(`Your Email confirmation token was expired! Please Resend a new one!`, 403));
                        }
                        else {
                            const verified = yield compare(token, user.OTPToken);
                            if (!verified) {
                                return next(new errorResponse_1.default(`Your token is invalid`, 401));
                            }
                            else {
                                user.verifiedEmail = true;
                                user.OTPToken = undefined;
                                user.OTPTokenExpire = undefined;
                                yield user.save();
                                const message = (0, emailTemplate_1.tVerifyEmail)(user.username);
                                console.log(`VerifiedCongratulations: ${message}`);
                                (0, sendEmail_1.default)({
                                    to: user.email,
                                    subject: "Congratulations, Email of your account has been verified!",
                                    text: message
                                });
                                yield res.status(201).json({
                                    success: true,
                                    status: `VERIFIED`,
                                    message: `Email Confirmation Verified Successfully on Email: ${user.email}!`,
                                    data: { email: user.email },
                                });
                            }
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
exports.verifyEmail = verifyEmail;
function altPasswordConfirm(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const { password } = req.body;
        const user = yield User_1.default.findOne({ altid }).select("+password");
        try {
            if (!password)
                return next(new errorResponse_1.default(`Please provide a password to pass through!`, 400));
            if (typeof user === null)
                return next(new errorResponse_1.default(`User not existed!`, 404));
            const isMatch = yield (user === null || user === void 0 ? void 0 : user.matchPassword(password));
            if (!isMatch) {
                return next(new errorResponse_1.default("Password incorrect, Invalid credentials", 401));
            }
            if (user === null || user === void 0 ? void 0 : user.verifiedPassword) {
                return next(new errorResponse_1.default(`You password verification was passed! [Configuraton is true]`, 403));
            }
            if (user !== undefined) {
                user.verifiedPassword = true;
            }
            yield (user === null || user === void 0 ? void 0 : user.save());
            yield res.status(201).json({
                success: true,
                status: `VERIFIED`,
                message: `Password Confirm successfully: ${isMatch}`
            });
        }
        catch (error) {
            user.verifiedPassword = undefined;
            yield (user === null || user === void 0 ? void 0 : user.save());
            next(error);
        }
    });
}
exports.altPasswordConfirm = altPasswordConfirm;
function deleteAccountByUsername(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) === req.params.username)
                return next(new errorResponse_1.default(`Forbidden, Oh! No You are proposed to delete your own account with given username: [${req.params.username}]! `, 403));
            yield User_1.default.deleteOne({ username: req.params.username });
            yield (0, profile_1.deleteProfileByUsername)(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteAccountByUsername = deleteAccountByUsername;
function changeEmail(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const { email } = req.body;
        try {
            if (!email)
                return next(new errorResponse_1.default(`Please provide a new email address to continue...`, 400));
            if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.email) === email)
                return next(new errorResponse_1.default(`You provided as a current email address!`, 403));
            const user = yield User_1.default.findOneAndUpdate({ altid }, { $set: { email } }, { new: true });
            user.verifiedEmail = undefined;
            yield (user === null || user === void 0 ? void 0 : user.save());
            yield res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Email Changing Operation was successfull! Previous Email: ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email} `,
                data: { email: user === null || user === void 0 ? void 0 : user.email },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.changeEmail = changeEmail;
function findEmailByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        try {
            if (!username) {
                return next(new errorResponse_1.default(`Please provide an username to continue...`, 400));
            }
            else {
                const user = yield User_1.default.findOne({ username });
                if (!user) {
                    return next(new errorResponse_1.default(`Username you provided not found! Make sure your username is correct!`, 404));
                }
                else {
                    if (!user.verifiedEmail) {
                        return next(new errorResponse_1.default(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
                    }
                    else {
                        yield res.status(200).json({
                            success: true,
                            status: `FOUNDED`,
                            message: `An Email found which referenced by Username: ${username}`,
                            data: { email: user.email },
                        });
                    }
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.findEmailByUsername = findEmailByUsername;
function changeUsername(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const { username } = req.body;
        try {
            if (!username)
                return next(new errorResponse_1.default(`Please Provide your target username in changes!`, 400));
            if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.username) === username)
                return next(new errorResponse_1.default(`Username are the same as the old one!`, 400));
            const result1 = yield User_1.default.findOneAndUpdate({ altid }, { $set: { username } }, { new: true });
            const result2 = yield Profile_1.default.findOneAndUpdate({ altid }, { $set: { username } }, { new: true });
            if (!result1)
                return next(new errorResponse_1.default(`Error Username Existed!`, 400));
            if (!result2)
                return next(new errorResponse_1.default(`Error Username Existed!`, 400));
            const result = `Match Username! [ ${result1.username} : ${result2.username} ]`;
            yield res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Update Operation successfully! Result: ${result}`,
                data: { username },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.changeUsername = changeUsername;
//# sourceMappingURL=auth.js.map