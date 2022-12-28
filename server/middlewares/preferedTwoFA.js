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
const User_1 = __importDefault(require("../models/User"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function PreferedTwoFA(req, _res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const { preferedTwoFA } = yield User_1.default.findOne({ altid });
        try {
            if (!preferedTwoFA) {
                return next(new errorResponse_1.default(`2FA mode is off, Please turn it on then try again`, 403));
            }
            next();
        }
        catch (error) {
            return next(new errorResponse_1.default(`You are in a state which 2FA authentication is not enabled! ${error}`, 500));
        }
    });
}
exports.default = PreferedTwoFA;
//# sourceMappingURL=preferedTwoFA.js.map