import { NextFunction, Request, Response } from "express";

import API from "../models/API";
const MAX = process.env.API_MAX || 25;

const genKey = () => {
    // create a base-36 string that is always 30 chars long a-z0-9
    // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
    return [...Array(30)]
        // tslint:disable-next-line:no-bitwise
        .map((_e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

const createUser = async (_email: string, req: Request) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const user = new API({
            apiKey: genKey(),
            email: _email,
            host: req.headers.origin, //  http://localhost:5500
            usage: [{ date: today, count: 0 }],
        });
        // When the developer registers a key, they typically provide a hostname where the key will
        // be used. We are getting that value from req.headers.origin which is what my browser sent

        // tslint:disable-next-line:no-console
        console.log('add user', user);
        await user.save();
        return user;
    } catch (error) {
        return;
    }
};

const validateKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Where is the API key expected to be?
        const host = req.headers.origin;
        // let apiKey = req.query.api_key; //version 1 with the querystring
        // let apiKey = req.params.apikey; //version 2 with the URL params
        const apiKey = req.header('x-api-key'); // version 3 using a header
        const account = await API.findOne({
            host,
            apiKey
        });
        // find() returns an object or undefined
        if (account) {
            // good match
            // check the usage
            const today = new Date().toISOString().split('T')[0];
            const usageIndex = account.usage.findIndex((day: any) => day.date === today);
            if (usageIndex >= 0) {
                // already used today
                if (account.usage[usageIndex].count >= MAX) {
                    // stop and respond
                    res.status(429).send({
                        error: {
                            code: 429,
                            message: 'Max API calls exceeded.',
                        },
                    });
                } else {
                    // have not hit todays max usage
                    account.usage[usageIndex].count++;
                    await account.save();
                    // tslint:disable-next-line:no-console
                    console.log('Good API call', account.usage[usageIndex]);
                    next();
                }
            } else {
                // not today yet
                account.usage.push({ date: today, count: 1 });
                await account.save();
                // ok to use again
                next();
            }
        } else {
            // stop and respond
            res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
        }
    } catch (error) {
        next(error);
    }
};

export { createUser, validateKey };
