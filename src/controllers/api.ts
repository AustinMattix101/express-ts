import { NextFunction, Request, Response } from "express";
import { createUser } from '../middlewares/apikeys';

import { cheeses } from '../data';

export function getAPI(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({ message: `Welcome to Mattix API` });
}

export function getMattixAPI(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({
        message: `Welcome to Mattix Team API! ;)`
    });
}

export const postRegisterAPI = async (req: Request, res: Response, next: NextFunction) => {
    //  create a new registered user
    //  just need to submit an email address
    //  real world would send an email and then put the account into
    //  a pending status until the email is validated...
    //  ...video for another day.
    try {
        const email = req.body.email;
        const user = await createUser(email, req);
        // tslint:disable-next-line:no-console
        console.log('USER LIST');
        // tslint:disable-next-line:no-console
        console.log(user);
        if (user) {
            res.status(201).send({ data: user });
        } else {
            res.status(201).send({ data: { error: "Duplicated Email Address" } });
        }

    } catch (error) {
        next(error);
    }
};

export const getCheeses = async (_req: Request, res: Response, next: NextFunction) => {

    try {
        // get list of all cheeses   // v2 has /:apikey
        const today = new Date().toISOString().split('T')[0];
        // tslint:disable-next-line:no-console
        console.log(today);
        res.status(200).send({
            data: cheeses,
        });
    } catch (error) {
        next(error);
    }
};

export const postCheeses = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // add a new cheese  /:apikey
        const cheese = {
            _id: Date.now(),
            name: req.body.cheese,
        };
        cheeses.push(cheese);
        res.status(201).send({
            data: cheese,
        });
    } catch (error) {
        next(error);
    }
};