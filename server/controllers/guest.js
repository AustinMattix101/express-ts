"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGuest = void 0;
const uuid_1 = require("uuid");
const postGuest = (req, res, _next) => {
    const { ipv4, ipv6, ipResponse, currencyString, currency, geoLocationPosition, exchangeRate, exchangeRateResponse, errorMessage, geoLocationErrorMessage } = req.body;
    const fingerprint = (0, uuid_1.v4)();
    const guest = { fingerprint, ipv4, ipv6, ipResponse, currencyString, currency, geoLocationPosition, exchangeRate, exchangeRateResponse, errorMessage, geoLocationErrorMessage };
    res.json(guest);
    console.log("Req:", req.headers);
    console.log("Guest:", guest);
    console.log("currencyString:", currencyString);
    console.log("Currency:", currency);
};
exports.postGuest = postGuest;
//# sourceMappingURL=guest.js.map