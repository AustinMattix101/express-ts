"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsWithOptions = exports.cors = void 0;
const cors_1 = __importDefault(require("cors"));
const whitelist = ['http://localhost:3000'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
const _cors = (0, cors_1.default)();
exports.cors = _cors;
exports.corsWithOptions = (0, cors_1.default)(corsOptionsDelegate);
//# sourceMappingURL=cors.js.map