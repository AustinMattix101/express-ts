import { NextFunction, Request, Response } from "express";
import { v4 } from 'uuid';

export const postGuest = (req: Request, res: Response, _next: NextFunction) => {
    const { ipv4, ipv6, ipResponse, currencyString, currency, geoLocationPosition, exchangeRate, exchangeRateResponse, errorMessage, geoLocationErrorMessage } = req.body;
    const fingerprint = v4();
    const guest = {fingerprint, ipv4, ipv6, ipResponse, currencyString, currency, geoLocationPosition, exchangeRate, exchangeRateResponse, errorMessage, geoLocationErrorMessage };
    res.json(guest);
    // tslint:disable-next-line:no-console
    console.log("Req:", req.headers);
    // tslint:disable-next-line:no-console
    console.log("Guest:", guest);
    // tslint:disable-next-line:no-console
    console.log("currencyString:", currencyString);
    // tslint:disable-next-line:no-console
    console.log("Currency:", currency);

}