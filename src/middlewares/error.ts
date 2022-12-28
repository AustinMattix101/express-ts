import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    let error = { ...err };

    error.message = err.message;
    error.stack = err.stack;
    error.statusCode = err.statusCode;

    if (err.code === 11000) {
        const message = `[Duplicate Field Value Enter Pairs]: ${err}`;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val: any) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        status: `FAILED`,
        error: error.message || "[Internal Server Error] Something went wrong!",
        stack: error.stack,
    });
};

export default errorHandler;