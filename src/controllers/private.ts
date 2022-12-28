import { NextFunction, Request, Response } from "express";

export function getPrivateData(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({
        success: true,
        status: `ACCESSED`,
        message: "You got access to the private data in this route."
    });
}