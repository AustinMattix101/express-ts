import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import ErrorResponse from "../utils/errorResponse";

/**
 *
 * @param req
 * @param _res
 * @param next
 * @returns Middleware Initial Does user have been verfiy email and TwoFA options is turn off available For > Log in {@link InitOnlyEmailConfirmation}
 */
export async function InitOnlyEmailConfirmation(req: Request, _res: Response, next: NextFunction) {
  const altid = req.user?.altid as string;
  const user = await User.findOne({ altid });
  const verifiedEmail = user?.verifiedEmail as boolean;

  try {

    if (!verifiedEmail) {
      return next(new ErrorResponse(`Your registered Email is not verified yet! Make sure proccess is completed in order to continue...`, 403));
    } else {
      next();
    }

  } catch (error) {
    if (typeof user == null)
      return next(error);
    next(error);
  }
}

/**
 *
 * @param req
 * @param _res
 * @param next
 * @returns Middleware Initial init Does user have been verfiy email and turn on isTwoFA available For > Sign in {@link InitpreferedTwoFAOption}
 */
export async function InitpreferedTwoFAOption(req: Request, _res: Response, next: NextFunction) {
  const altid = req.user?.altid as string;
  const user = await User.findOne({ altid });

  const preferedTwoFA = user?.preferedTwoFA as boolean;
  const validationResetTime = user?.validationResetTime as Date;
  const validatedTwoFA = user?.validatedTwoFA as boolean;

  try {

    if (!preferedTwoFA) {
      next();
    } else {

      if (!validationResetTime) {

        return next(new ErrorResponse(`You are in a state which [Token] of 2FA (Two Factor) authentication is expired! Please valid your token to continue...`, 401));

      } else {

        if (!validatedTwoFA) {
          return next(new ErrorResponse(`You are in a state which 2FA (Two Factor) authentication is not validated! Please valid your authentication to continue...`, 401));
        } else {

          if (validationResetTime < (Date.now() as unknown as Date)) {
            return next(new ErrorResponse(`Your Two Factor Authentication Token is expired! Please Validated to continue...`, 401));
          } else {

            next();
          }

        }

      }
    }

  } catch (error) {
    next(error);
  }
}