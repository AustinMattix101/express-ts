import { NextFunction, Request, Response } from "express";

import Hotel from "../models/Hotel";
import ErrorResponse from "../utils/errorResponse";

export const postHotel = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.user?.username as string;

    function setProps(request: Request["body"], _username: string) {
        request.postBy = _username;

        return request;
    }

    try {
        if (!req.body) {
            return next(new ErrorResponse(`Please provide a detail of your target hotel!`, 400));
        } else {
            const request = setProps(req.body, username);
            const hotel = new Hotel(request);

            try {
                const data = await hotel.save();

                await res.status(201).json({
                    success: true,
                    status: `CREATED`,
                    message: `Hotel created successfully with Username : ${username}`,
                    data,
                });
            } catch (error) {
                next(new ErrorResponse(`Something went wrong on create a new hotel! Error: ${error}`, 400));
            }
        }
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    const request = req.body;
    try {
        const hotel = await Hotel.findByIdAndUpdate(params, { $set: request }, { new: true });

        if (!hotel) {
            return next(new ErrorResponse(`Hotel with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Hotel updated successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    try {
        const hotel = await Hotel.findByIdAndDelete(params);

        if (!hotel) {
            return next(new ErrorResponse(`Hotel with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Hotel deleted successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findHotels = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await Hotel.find();

        if (!hotel) {
            return next(new ErrorResponse(`There are no hotel documents!`, 404));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Hotels are found successfully`,
                data: hotel,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findHotel = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    try {
        const hotel = await Hotel.findById(params);

        if (!hotel) {
            return next(new ErrorResponse(`Hotel with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Hotel Founded successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
    const cities: string[] = (req.query.cities as string).split(",");

    try {
        const list = await Promise.all(cities.map((city: string) => {
            return Hotel.countDocuments({ city });
        }));

        await res.status(200).json({
            success: true,
            status: `QUERIED`,
            message: `Query results are found successfully! Query: ${cities}`,
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
    const types: string[] = (req.query.types as string).split(",");

    try {
        const list = await Promise.all(types.map((type: string) => {
            return Hotel.countDocuments({ type });
        }));

        await res.status(200).json({
            success: true,
            status: `QUERIED`,
            message: `Query results are found successfully! Query: ${types}`,
            data: list,
        });
    } catch (error) {
        next(error);
    }
};