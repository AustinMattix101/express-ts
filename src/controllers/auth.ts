import { NextFunction, Request, Response } from "express";

import { v4 } from 'uuid';
import { createHash } from "crypto";
import bcryptjs from 'bcryptjs';
const { compare } = bcryptjs;
import User from "../models/User";
import Profiles from "../models/Profile";
import ErrorResponse from "../utils/errorResponse";
import sendEmail from "../utils/sendEmail";
import { deleteProfileByUsername } from "./profile";
import { tRegister, tForgotpassword, tResetpassword, tSendEmailConfirm, tVerifyEmail } from "../middlewares/emailTemplate";

export function getHello(_req: Request, res: Response) {
    res.json({ message: `Welcome to Camunited Auth API!` });
}

export async function register(req: Request, res: Response, next: NextFunction) {

    const altid = v4();

    const { username, email, password, accepttos, ...other } = req.body;

    try {
        if (!username || !email || !password)
            return next(new ErrorResponse(`Please provide account detail in order to create a new account!`, 400));

        if (!accepttos || accepttos === false)
            return next(new ErrorResponse(`Please accept our terms an privacy policy in order to create a new account!`, 400));

        const user = await User.create({
            altid,
            username,
            email,
            password
        });

        const profile = await Profiles.create({
            altid,
            username,
            accepttos,
            ...other
        });

        const message = tRegister(user.username);

        // tslint:disable-next-line:no-console
        console.log(`CreatedCongratulations: ${message}`);

        sendEmail({
            to: user.email,
            subject: "Congratulations, Account has been created!",
            text: message
        });

        await res.status(201).json({
            success: true,
            status: `CREATED`,
            message: `Account Create successfully!`,
            data: {
                email: user.email,
                username: user.username,
            }
        });

        // tslint:disable-next-line:no-console
        console.log(`User Register:
        Account Data: ${user},
        Profile Data: ${profile}`);

    } catch (error) {
        await User.deleteOne({ altid });
        await Profiles.deleteOne({ altid });
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorResponse("Please provide an email and password", 400));

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return next(new ErrorResponse(`Log Email Not Found! [ Invalid credentials]: ${email}`, 401));

        const isMatch = await user.matchPassword(password);

        if (!isMatch)
            return next(new ErrorResponse("Log Password incorrect! [Invalid credentials]", 401));

        await user.setInit(req, res, next);

    } catch (error) {
        next(error);
    }
}

export async function forgotpassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse(`Email could not be found! Email: ${email}`, 404));
        } else {

            if (!user.verifiedEmail) {
                return next(new ErrorResponse(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
            } else {

                const resetToken = user.getResetPasswordToken();

                await user.save();

                const message = tForgotpassword(resetToken);

                // tslint:disable-next-line:no-console
                console.log(`ResetPasswordEmailToken: ${message}`);

                try {
                    await sendEmail({
                        to: user.email,
                        subject: "Password Reset Request",
                        text: message
                    });
                    await res.status(201).json({
                        success: true,
                        status: `PENDING`,
                        message: `Reset Password Email have been Sent to Email: ${user.email}!`,
                        data: { email: user.email }
                    });
                } catch (error) {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpire = undefined;

                    await user.save();

                    return next(new ErrorResponse("Email could not be send!", 500));
                }

            }
        }
    } catch (error) {
        next(error);
    }
}

export async function resetpassword(req: Request, res: Response, next: NextFunction) {
    const resetPasswordToken = createHash("sha256").update(req.params.resetToken).digest("hex");

    function sendEmailHelper(user: any) {

        const message = tResetpassword(user.username);

        // tslint:disable-next-line:no-console
        console.log(`PasswordResetCongratulations: ${message}`);

        return sendEmail({
            to: user.email,
            subject: "Congratulations, Your Password has been reseted!",
            text: message
        });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorResponse("Error: [Invalid Reset Token!] Make sure your token is valid!", 400));
        } else {
            if (!user.verifiedEmail) {

                return next(new ErrorResponse(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));

            } else {

                if (!user.preferedTwoFA) {

                    user.password = req.body.password;
                    user.verifiedPassword = undefined;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpire = undefined;

                    await user.save();

                    sendEmailHelper(user);

                    await res.status(201).json({
                        success: true,
                        status: `RESETED`,
                        message: `Password Reseted Successfully on Email ${user.email}`,
                        data: { email: user.email }
                    });

                } else {

                    if (!user.validationResetTime) {
                        return next(new ErrorResponse(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 401));

                    } else {

                        if (!user.validatedTwoFA) {
                            return next(new ErrorResponse(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 401));
                        } else {

                            if (user.validationResetTime < new Date(Date.now())) {
                                return next(new ErrorResponse(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 401));
                            } else {
                                user.password = req.body.password;
                                user.verifiedPassword = undefined;
                                user.resetPasswordToken = undefined;
                                user.resetPasswordExpire = undefined;

                                await user.save();

                                sendEmailHelper(user);

                                await res.status(201).json({
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

    } catch (error) {
        next(error);
    }
}

export async function sendEmailConfirm(req: Request, res: Response, next: NextFunction) {
    // Confirm Email after Register
    const { email } = req.body;
    const user = await User.findOne({ email });

    try {
        if (!email)
            return next(new ErrorResponse(`Please provide a email address to get an email of confirmation!`, 400));

        if (!user)
            return next(new ErrorResponse(`Email you given not found! Email: ${email}`, 404));

        if (user.verifiedEmail)
            return next(new ErrorResponse(`You Email confirmation was passed! [Configuraton is true]`, 403));

        const OTP = await user.getOTPConfirmEmail().toString();
        // tslint:disable-next-line:no-console
        console.log(`OTP:`, OTP);

        await user.save();

        const message = tSendEmailConfirm(OTP);

        // tslint:disable-next-line:no-console
        console.log(`OTPConfirmEmail: ${message}`);

        await sendEmail({
            to: user.email,
            subject: "Email Confirmation Request",
            text: message
        });

        await res.status(201).json({
            success: true,
            status: `PENDING`,
            message: `Email Confirmation have been Sent to ${user.email}`,
            data: { email: user.email }
        });

    } catch (error) {
        user!.OTPToken = undefined;
        user!.OTPTokenExpire = undefined;

        await user?.save();

        next(error);
    }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
    const { token, email } = req.body;

    try {
        if (!token || !email) {
            return next(new ErrorResponse(`Please provide an email and confirm token!`, 400));

        } else {

            const user = await User.findOne({ email });

            if (!user) {
                return next(new ErrorResponse("Email not found! Make sure your email is correct!!", 400));
            } else {

                if (user.verifiedEmail) {
                    return next(new ErrorResponse(`You Email confirmation was passed! [Configuraton is true]`, 403));

                } else {

                    if (user.OTPTokenExpire === undefined || user.OTPTokenExpire < new Date(Date.now())) {
                        return next(new ErrorResponse(`Your Email confirmation token was expired! Please Resend a new one!`, 403));

                    } else {

                        const verified = await compare(token, user.OTPToken as string);

                        if (!verified) {
                            return next(new ErrorResponse(`Your token is invalid`, 401));

                        } else {

                            user.verifiedEmail = true;
                            user.OTPToken = undefined;
                            user.OTPTokenExpire = undefined;
                            await user.save();

                            const message = tVerifyEmail(user.username);

                            // tslint:disable-next-line:no-console
                            console.log(`VerifiedCongratulations: ${message}`);

                            sendEmail({
                                to: user.email,
                                subject: "Congratulations, Email of your account has been verified!",
                                text: message
                            });

                            await res.status(201).json({
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

    } catch (error) {
        next(error);
    }
}

export async function altPasswordConfirm(req: Request, res: Response, next: NextFunction) {
    // Confirm Password in order to make some sensitive changes!
    const altid = req.user?.altid as string;
    const { password } = req.body;
    const user = await User.findOne({ altid }).select("+password");

    try {
        if (!password)
            return next(new ErrorResponse(`Please provide a password to pass through!`, 400));

        if (typeof user === null)
            return next(new ErrorResponse(`User not existed!`, 404));

        const isMatch = await user?.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Password incorrect, Invalid credentials", 401));
        }

        if (user?.verifiedPassword) {
            return next(new ErrorResponse(`You password verification was passed! [Configuraton is true]`, 403));
        }

        // ⛔️ Error: The left-hand side of an
        // assignment expression may not be
        // an optional property access.ts(2779)

        // 👈️ To solve the error, use an if statement as a type guard before the assignment.

        if (user !== undefined) {
            user!.verifiedPassword = true;
        }
        //    👇️ Or Below use !
        // user!.verifiedPassword = true;

        // 👇️ undefined
        // console.log(user?.verifiedPassword.toLowerCase());

        await user?.save();

        await res.status(201).json({
            success: true,
            status: `VERIFIED`,
            message: `Password Confirm successfully: ${isMatch}`
        });

    } catch (error) {

        user!.verifiedPassword = undefined;

        await user?.save();

        next(error);
    }
}

export async function deleteAccountByUsername(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user?.username === req.params.username)
            return next(new ErrorResponse(`Forbidden, Oh! No You are proposed to delete your own account with given username: [${req.params.username}]! `, 403));

        await User.deleteOne({ username: req.params.username });
        await deleteProfileByUsername(req, res, next);

    } catch (error) {
        next(error);
    }
}

export async function changeEmail(req: Request, res: Response, next: NextFunction) {
    const altid = req.user?.altid as string;
    const { email } = req.body;

    try {
        if (!email)
            return next(new ErrorResponse(`Please provide a new email address to continue...`, 400));

        if (req.user?.email === email)
            return next(new ErrorResponse(`You provided as a current email address!`, 403));

        const user = await User.findOneAndUpdate({ altid }, { $set: { email } }, { new: true });

        user!.verifiedEmail = undefined;
        await user?.save();

        await res.status(201).json({
            success: true,
            status: `UPDATED`,
            message: `Email Changing Operation was successfull! Previous Email: ${req.user?.email} `,
            data: { email: user?.email },
        });

    } catch (error) {
        next(error);
    }
}

export async function findEmailByUsername(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    try {
        if (!username) {
            return next(new ErrorResponse(`Please provide an username to continue...`, 400));
        } else {
            const user = await User.findOne({ username });

            if (!user) {
                return next(new ErrorResponse(`Username you provided not found! Make sure your username is correct!`, 404));
            } else {
                if (!user.verifiedEmail) {
                    return next(new ErrorResponse(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
                } else {
                    await res.status(200).json({
                        success: true,
                        status: `FOUNDED`,
                        message: `An Email found which referenced by Username: ${username}`,
                        data: { email: user.email },
                    });
                }
            }
        }

    } catch (error) {
        next(error);
    }
}

export async function changeUsername(req: Request, res: Response, next: NextFunction) {
    const altid = req.user?.altid as string;
    const { username } = req.body;

    try {
        if (!username)
            return next(new ErrorResponse(`Please Provide your target username in changes!`, 400));

        if (req.user?.username === username)
            return next(new ErrorResponse(`Username are the same as the old one!`, 400));

        const result1 = await User.findOneAndUpdate({ altid }, { $set: { username } }, { new: true });

        const result2 = await Profiles.findOneAndUpdate({ altid }, { $set: { username } }, { new: true });

        if (!result1)
            return next(new ErrorResponse(`Error Username Existed!`, 400));

        if (!result2)
            return next(new ErrorResponse(`Error Username Existed!`, 400));

        const result = `Match Username! [ ${result1.username} : ${result2.username} ]`;

        await res.status(201).json({
            success: true,
            status: `UPDATED`,
            message: `Update Operation successfully! Result: ${result}`,
            data: { username },
        });

    } catch (error) {
        next(error);
    }
}