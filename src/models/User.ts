import { randomBytes, createHash, randomInt } from "crypto";
import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import twofactor from "node-2fa";
import ErrorResponse from "../utils/errorResponse";
import { NextFunction, Request, Response } from "express";
// import bson from "bson"
// import { v4 } from 'uuid';

interface ITempKey {
    secret: string;
    uri: string;
    qr: string;
};

interface IUser {
    altid: string;
    username: string;
    email: string;
    password: string;
    role: string;
    OTPToken?: string;
    OTPTokenExpire?: Date;
    verifiedEmail?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    verifiedPassword?: boolean;
    TwoFAKey?: object;
    verifiedTwoFA?: boolean;
    validatedTwoFA?: boolean;
    validationResetTime?: Date;
    preferedTwoFA: boolean;
    matchPassword(password: string): Promise<boolean>;
    setInit(req: Request, res: Response, next: NextFunction): Promise<any>;
    getSignedToken(): string;
    getOTPConfirmEmail(): number;
    getResetPasswordToken(): string;
    getTwoFAKey(): ITempKey;
    verifyTwoFAToken(token: string): number;
    validateTwoFAToken(token: string): number;
}

const UserSchema = new Schema({
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

// declare interface IUser extends InferSchemaType<typeof UserSchema> {

// }

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

/**
 *
 * @param password
 * @returns Miidelware lookup for matching password true | false {@link UserSchema}
 */
UserSchema.methods.matchPassword = async function (password: string) {
    return await compare(password, this.password);
};

/**
 *
 * @param _req
 * @param res
 * @param next
 * @returns Middleware initial login state and sign in state...
 * If Log in mean TwoFA is default false if true validate token needed {@link UserSchema}
 */
UserSchema.methods.setInit = async function (_req: any, res: any, next: any) {

    try {
        if (!this.verifiedEmail) {
            return next(new ErrorResponse(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
        } else {

            if (!this.preferedTwoFA) { // normal user log in
                const token = this.getSignedToken();

                const { _doc } = this;
                const { _id, altid, password, TwoFAKey, ...data } = _doc;
                await res.status(201).json({
                    success: true,
                    status: `LOGGED`,
                    message: `You have been logged in successfully!`,
                    token,
                    data,
                });

            } else { // user with two factor is enable or turn on state

                if (!this.validationResetTime) {

                    return next(new ErrorResponse(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 422));

                } else {

                    if (!this.validatedTwoFA) {
                        return next(new ErrorResponse(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 422));
                    } else {

                        if (this.validationResetTime < Date.now()) {
                            return next(new ErrorResponse(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 422));
                        } else {
                            const token = this.getSignedToken();

                            const { _doc } = this;
                            const { _id, altid, password, TwoFAKey, ...data } = _doc;

                            await res.status(201).json({
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



    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(`Error: ${error}`);
        next(error);
    }
};

UserSchema.methods.getSignedToken = function () {
    return sign({ id: this._id }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.JWT_EXPIRE });
};

UserSchema.methods.getOTPConfirmEmail = async function () {

    function reverseString(str: any) {
        return str.slice('').reverse('').join('');
    }

    const otpMath = `${Math.floor(
        Math.random() * 99999 + 100000
    )
        }`;

    const otpString = String(otpMath);

    const randomOTP = [...String(otpString)];
    const n1 = randomInt(1, 10);
    const n2 = randomInt(1, 10);
    randomOTP[0] = String(n1);
    randomOTP[5] = String(n2);

    const OTP = await reverseString(randomOTP) as string;
    const ParseOTP = parseInt(OTP, undefined);

    // Hash the OTP
    const saltRounds = await genSalt(10);
    const hashedOTP = await hash(OTP, saltRounds);

    this.OTPToken = hashedOTP;
    this.OTPTokenExpire = Date.now() + 10 * (60 * 1000); // Equal 10 min [milliseconds]

    return ParseOTP;
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = randomBytes(20).toString("hex");

    this.resetPasswordToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000); // Equal 15 min [milliseconds]

    return resetToken;
};

UserSchema.methods.getTwoFAKey = function () {
    const tempKey = twofactor.generateSecret({ name: `${process.env.BRAND_NAME}`, account: this.username });
    this.TwoFAKey = tempKey;
    return tempKey;
};

/**
 *
 * @param token string
 * @returns Generated Token
 * { delta: 0 } mean matched
 * {delta: -1} means that the client entered the key too late (a newer key was meant to be used).
 * {delta: 1} means the client entered the key too early (an older key was meant to be used).
 * {delta: 0} means the client was within the time frame of the current key.
 */
UserSchema.methods.verifyTwoFAToken = function (token: any) {
    const result = twofactor.verifyToken(this.TwoFAKey.secret, token);
    return result?.delta;
};

UserSchema.methods.validateTwoFAToken = function (token: any) {
    const result = twofactor.verifyToken(this.TwoFAKey.secret, token);
    return result?.delta;
};

/**
 * @Usage UserSchema Class and Auth Methods {@link UserSchema}
 */
const User = model<IUser>("User", UserSchema);

export default User;