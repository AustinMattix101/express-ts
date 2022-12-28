import { NextFunction, Request, Response } from "express";

export const postUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await res.status(201)
            .setHeader("Content-Type", "application/json")
            .json({
                data: {
                    file: req.file,
                    files: req.files
                }
            });
    } catch (error) {
        next(error);
    }
};