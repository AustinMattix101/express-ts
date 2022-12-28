import { NextFunction, Request, Response } from "express";

import User from "../models/User";
import ErrorResponse from "../utils/errorResponse";

export const getTwoFA = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({ message: `Welcome to the two factor authentication!` });
};

export const getTwoFAOn = async (req: Request, res: Response, next: NextFunction) => {

    const altid = req.user?.altid as string;

    try {
        await User.findOneAndUpdate({ altid }, { $set: { preferedTwoFA: true } }, { new: true });

        await res.status(201).json({ success: true, status: `ON`, message: `You have been turn on successfully for 2FA [Two Factor Authentication]!`, data: { email: req.user?.email, username: req.user?.username } });

    } catch (error) {
        next(error);
    }
};

export const getTwoFAOff = async (req: Request, res: Response, next: NextFunction) => {

    const altid = req.user?.altid as string;

    try {
        await User.findOneAndUpdate(
            { altid },
            { $set: { preferedTwoFA: false } }
        );
        await User.findOneAndUpdate(
            { altid },
            { $set: { TwoFAKey: undefined } }
        );
        await User.findOneAndUpdate(
            { altid },
            { $set: { verifiedTwoFA: undefined } }
        );
        await User.findOneAndUpdate(
            { altid },
            { $set: { validatedTwoFA: undefined } }
        );

        res.status(201).json({ success: true, status: `OFF`, message: `You have been turn off successfully for 2FA [Two Factor Authentication]!`, data: { email: req.user?.email, username: req.user?.username } });

    } catch (error) {
        next(error);
    }
};

export const postTwoFARegister = async (req: Request, res: Response, next: NextFunction) => {

    const altid = req.user?.altid as string;

    const user = await User.findOne({ altid });

    try {
        const tempKey = user?.getTwoFAKey();
        await user?.save();

        await res.status(201).json({ success: true, status: `CREATED`, key: tempKey?.secret, qr: tempKey?.qr, uri: tempKey?.uri, data: `Email: ${user?.email} Username: ${user?.username}` });

        user!.verifiedTwoFA = undefined;
        user!.validatedTwoFA = undefined;
        await user?.save();

    } catch (error) {
        next(new ErrorResponse(`Generating the key unsuccessfully!`, 500));
    }
};

export const postTwoFAVerify = async (req: Request, res: Response, next: NextFunction) => {

    const altid = req.user?.altid as string;

    const { token } = req.body;

    const user = await User.findOne({ altid });

    try {
        if (!token)
            return next(new ErrorResponse(`Please provide your token to continue...`, 400));
        const delta = user?.verifyTwoFAToken(token) as number;

        if (delta > 0 || delta < 0) {
            user!.verifiedTwoFA = false;
            await user?.save();
            return next(new ErrorResponse(`Oh bad request!, your token is not been verified! Ensure that you enter correctly or token is expired: ${delta} minute(s).`, 401));
        } else {
            user!.verifiedTwoFA = true;
            user!.validatedTwoFA = undefined;
            user!.validationResetTime = undefined;
            await user?.save();
            await res.status(201).json({ success: true, status: `VERIFIED`, message: `Congratulation, your token is been verified!` });
        }

    } catch (error) {
        next(new ErrorResponse(`Verification of the token unsuccessfully! Make sure you have been checked your token correctly`, 500));
    };
};

export const postTwoFAValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.body;

    const user = await User.findOne({ email });

    try {
        if (!email)
            return next(new ErrorResponse(`Please provide your email to continue...`, 400));

        if (!token)
            return next(new ErrorResponse(`Please provide your token to continue...`, 400));

        if (!user?.verifiedTwoFA) {
            user!.validatedTwoFA = false;
            await user?.save();
            return next(new ErrorResponse(`Validation is broken! Ensure that you have been verify your 2FA token yet to continue...!`, 403));
        }

        const delta = user.validateTwoFAToken(token);

        if (delta > 0 || delta < 0) {
            user.validatedTwoFA = false;
            await user.save();
            return next(new ErrorResponse(`Oh bad request!, your token is not been validated! Ensure that you enter correctly or token is expired: ${delta} minute(s).`, 401));
        } else {
            user.validatedTwoFA = true;
            user.validationResetTime = ((Date.now() + 7 * 24 * 60 * (60 * 1000)) as unknown as Date); // 7 days
            await user.save();
            await res.status(201).json({ success: true, status: `VALIDATED`, message: `Congratulation, your Validation is been passed!` });
        }

    } catch (error) {
        next(new ErrorResponse(`Validation of the token unsuccessfully! Make sure you have been checked your token correctly`, 500));
    };
};