import { NextFunction, Request, Response } from "express";

export function getAdminData(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({
        success: true,
        status: `ACCESSED`,
        message: "You got access to the admin data in this route."
    });
}