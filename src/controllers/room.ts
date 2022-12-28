
import { NextFunction, Request, Response } from "express";

import Hotel from "../models/Hotel";
import Room from "../models/Room";
import ErrorResponse from "../utils/errorResponse";

export const postRoom = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.user?.username as string;
    const params = req.params.hotelid;

    function setProps(request: Request["body"], _username: string) {
        request.postBy = _username;

        return request;
    }

    try {
        const request = setProps(req.body, username);
        const room = new Room(request);

        const data = await room.save();

        try {
            await Hotel.findByIdAndUpdate(params, { $push: { rooms: room._id } });

            await res.status(201).json({
                success: true,
                status: `CREATED`,
                message: `Rooom created successfully with given Hotel ID : ${params}`,
                data,
            });
        } catch (error) {
            next(new ErrorResponse(`Something went wrong on create a new room! Error: ${error}`, 400));
        }
    } catch (error) {
        next(error);
    }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    const request = req.body;
    try {
        const room = await Room.findByIdAndUpdate(params, { $set: request }, { new: true });

        if (!room) {
            return next(new ErrorResponse(`Room with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Room updated successfully with given ID : ${params}`,
                data: room,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    const hotelid = req.params.hotelid;
    const params = req.params.id;
    try {
        const room = await Room.findByIdAndDelete(params);

        if (!room) {
            return next(new ErrorResponse(`Room with given ID: [${params}] not found!`, 400));
        } else {
            await Hotel.findByIdAndUpdate(hotelid, { $pull: { rooms: params } });

            await res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Room deleted successfully with given ID : ${params}`,
                data: room,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findRooms = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await Room.find();

        if (!room) {
            return next(new ErrorResponse(`There are no room documents`, 404));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Rooms are found successfully`,
                data: room,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findRoom = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    try {
        const room = await Room.findById(params);

        if (!room) {
            return next(new ErrorResponse(`Room with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Room Founded successfully with given ID : ${params}`,
                data: room,
            });
        }
    } catch (error) {
        next(error);
    }
};