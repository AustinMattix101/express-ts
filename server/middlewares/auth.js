"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProtect = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_1 = require("../types/custom");
const { verify } = jsonwebtoken_1.default;
const User_1 = __importDefault(require("../models/User"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function protect(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const languageHeader = req.headers["content-language"];
        let language = custom_1.SUPPORTED_LANGUAGES[0];
        if (typeof languageHeader === "string" && custom_1.SUPPORTED_LANGUAGES.includes(languageHeader)) {
            language = languageHeader;
        }
        let token;
        const headers = req.headers[`authorization`];
        if (headers && headers.startsWith("Bearer")) {
            token = headers.split(" ")[1];
        }
        if (!token) {
            return next(new errorResponse_1.default("No signed-token found!, Not authorized to access this route.", 401));
        }
        try {
            const decoded = verify(String(token), `${process.env.JWT_SECRET}`);
            const user = yield User_1.default.findById(decoded.id);
            if (!user) {
                return next(new errorResponse_1.default("No user found with this given ID.", 404));
            }
            const { id, altid, username, email } = user;
            req.user = { id, altid, username, email, authenticationToken: token, language };
            console.log(`Retrieving User [REQ.USER]:`, req.user);
            next();
        }
        catch (error) {
            return next(new errorResponse_1.default("Not authorized to access this route", 401));
        }
    });
}
exports.protect = protect;
function AdminProtect(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { altid } = req.user;
        const { role } = yield User_1.default.findOne({ altid });
        try {
            if (role !== `admin`) {
                return next(new errorResponse_1.default(`You are not authorized access this route only admins are allow!`, 403));
            }
            next();
        }
        catch (error) {
            return next(new errorResponse_1.default(`You are in a state which no role options in database!`, 500));
        }
    });
}
exports.AdminProtect = AdminProtect;
//# sourceMappingURL=auth.js.map