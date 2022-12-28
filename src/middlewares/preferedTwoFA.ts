import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import ErrorResponse from "../utils/errorResponse";

/**
 *
 * @param req
 * @param _res
 * @param next
 * @returns Middleware Initial preferedTwoFA options is turn on || turn off by default {@link PreferedTwoFA}
 */
async function PreferedTwoFA(req: Request, _res: Response, next: NextFunction) {
    const altid = req.user?.altid as string;
    const { preferedTwoFA }: any = await User.findOne({ altid });

    try {
        if (!preferedTwoFA) {
            return next(new ErrorResponse(`2FA mode is off, Please turn it on then try again`, 403));
        }
        next();
    } catch (error) {
        return next(new ErrorResponse(`You are in a state which 2FA authentication is not enabled! ${error}`, 500));
    }
}

export default PreferedTwoFA;