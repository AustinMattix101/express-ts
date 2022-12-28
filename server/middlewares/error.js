"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorHandler = (err, _req, res, _next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    error.stack = err.stack;
    error.statusCode = err.statusCode;
    if (err.code === 11000) {
        const message = `[Duplicate Field Value Enter Pairs]: ${err}`;
        error = new errorResponse_1.default(message, 400);
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        status: `FAILED`,
        error: error.message || "[Internal Server Error] Something went wrong!",
        stack: error.stack,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map