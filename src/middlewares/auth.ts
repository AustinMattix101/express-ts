import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { Language, SUPPORTED_LANGUAGES } from "../types/custom";
const { verify } = jsonwebtoken;
import User from "../models/User";
import ErrorResponse from "../utils/errorResponse";

/**
 *
 * @param req
 * @param _res
 * @param next
 * @returns Middleware restrict User Privillege. {@link protect}
 */
export async function protect(req: Request, _res: Response, next: NextFunction) {

    const languageHeader = req.headers["content-language"];

    // default language: "en"
    let language: Language = SUPPORTED_LANGUAGES[0];

    if (typeof languageHeader === "string" && SUPPORTED_LANGUAGES.includes(languageHeader)) {
        language = languageHeader;
    }

    // extending the Request object with a language property of type Language...

    let token;

    const headers = req.headers[`authorization`];

    if (headers && headers.startsWith("Bearer")) {
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDFlYTFmNWEwOWJiZDZmNTQ1MmEwZiIsImlhdCI6MTY2NTI2NDE1OSwiZXhwIjoxNjY1MjY0NzU5fQ.f6Mm729KQicnx6YXdr7TFESSQgzRDJ3qBPPdY7OYGKQ
        token = headers.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("No signed-token found!, Not authorized to access this route.", 401));
    }

    try {
        const decoded: any = verify(String(token), `${process.env.JWT_SECRET}`);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this given ID.", 404));
        }

        const { id, altid, username, email } = user;
        req.user = { id, altid, username, email, authenticationToken: token, language };

        // tslint:disable-next-line:no-console
        console.log(`Retrieving User [REQ.USER]:`, req.user);

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
}

/**
 *
 * @param req
 * @param _res
 * @param next
 * @returns Middleware restrict Admin Privillege. {@link AdminProtect}
 */
export async function AdminProtect(req: any, _res: Response, next: NextFunction) {
    const { altid } = req.user;
    const { role }: any = await User.findOne({ altid });

    try {

        if (role !== `admin`) {
            return next(new ErrorResponse(`You are not authorized access this route only admins are allow!`, 403));
        }
        next();
    } catch (error) {
        return next(new ErrorResponse(`You are in a state which no role options in database!`, 500));
    }

}