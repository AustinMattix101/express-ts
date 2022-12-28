import { NextFunction, Request, Response } from "express";

import Profile from '../models/Profile';
import ErrorResponse from "../utils/errorResponse";

export async function findProfile(req: Request, res: Response, next: NextFunction) {
    // Profiles.populate('profile.fiance')
    const altid = req.user?.altid as string;
    const profile = await Profile.findOne({ altid });

    try {
        res.status(200).json({ success: true, status: `RECEIVED`, message: `Get Operation & Responses Delivered successfully!`, data: profile });

    } catch (error) {
        next(error);
    }

}

export async function findProfileByUsername(req: Request, res: Response, next: NextFunction) {

    // Profiles.populate('bio.partner')
    const params = req.params.username;
    const profile = await Profile.findOne({ username: params });

    try {

        if (!profile) {
            return next(new ErrorResponse(`Parameters of Username: [${params}] you given not found!`, 404));
        }

        res.status(200).json({ success: true, status: `RECEIVED`, message: `Get Operation & Responses ByUsername Delivered successfully!`, data: profile });

    } catch (error) {
        next(error);
    }
}

export async function writeProfile(req: Request, res: Response, next: NextFunction) {

    const altid = req.user?.altid as string;

    try {

        if (!req.body) {
            return next(new ErrorResponse(`Please provide a detail of your target profile!`, 400));
        }

        const request = await setProps(req.body, altid);

        const profile = await Profile.findOneAndUpdate({ altid }, { $set: request }, { new: true });

        function setProps(_request: Request["body"], id: string) {
            _request.altid = id;
            _request.fullname = `${_request.firstname} ${_request.middlename} ${_request.lastname}`;

            return _request;
        }

        res.status(201).json({
            success: true,
            status: `WRITTEN`,
            message: `Post Operation & Responses Delivered successfully!`,
            data: profile
        });

    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    const altid = req.user?.altid as string;

    await Profile.findOneAndUpdate({ altid }, { $set: req.body }, { new: true })
        .then(profiles => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: `UPDATED`, message: `Update Operation is completed successfully!`, data: profiles });
        })
        .catch(err => next(err));
}

export async function clearProfile(req: Request, res: Response, next: NextFunction) {

    const username = req.user?.username as string as string;
    const altid = req.user?.altid as string as string;

    await Profile.findOneAndDelete({ altid })
        .then(profile => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: true,
                status: `CLEARED`,
                message: `Delete Operation is completed successfully! Ensure that you can't get it back!`,
                data: profile,
            });
        })
        .catch(err => next(err));

    await Profile.create({ altid, username })
        .catch(err => next(err));
}

export async function updateProfileByUsername(req: Request, res: Response, next: NextFunction) { // Admin Only
    const params = req.params.username;
    const profile = await Profile.findOneAndUpdate({ username: params }, { $set: req.body }, { new: true });

    try {

        if (!profile) {
            return next(new ErrorResponse(`Parameters of Username: [${params}] you given not found!`, 404));
        }

        await res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json({
                success: true, status: `UPDATED`,
                message: `Update Operation byUsername is completed successfully!`,
                data: profile
            });

    } catch (error) {
        next(error);
    }
}

export async function deleteProfileByUsername(req: Request, res: Response, next: NextFunction) {   // Admin Only
    const params = req.params.username;
    const profile = await Profile.findOneAndDelete({ username: params });

    try {
        if (!profile) {
            return next(new ErrorResponse(`Parameters of Username: [${params}] you given not found!`, 404));
        }


        await res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json({
                success: true, status: `DELETED`,
                data: `Delete Operation byUsername is completed successfully! Ensure that you can't get it back!
                : ${profile}`
            });

    } catch (error) {
        next(error);
    }
}