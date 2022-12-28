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
exports.validateKey = exports.createUser = void 0;
const API_1 = __importDefault(require("../models/API"));
const MAX = process.env.API_MAX || 25;
const genKey = () => {
    return [...Array(30)]
        .map((_e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};
const createUser = (_email, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date().toISOString().split('T')[0];
        const user = new API_1.default({
            apiKey: genKey(),
            email: _email,
            host: req.headers.origin,
            usage: [{ date: today, count: 0 }],
        });
        console.log('add user', user);
        yield user.save();
        return user;
    }
    catch (error) {
        return;
    }
});
exports.createUser = createUser;
const validateKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const host = req.headers.origin;
        const apiKey = req.header('x-api-key');
        const account = yield API_1.default.findOne({
            host,
            apiKey
        });
        if (account) {
            const today = new Date().toISOString().split('T')[0];
            const usageIndex = account.usage.findIndex((day) => day.date === today);
            if (usageIndex >= 0) {
                if (account.usage[usageIndex].count >= MAX) {
                    res.status(429).send({
                        error: {
                            code: 429,
                            message: 'Max API calls exceeded.',
                        },
                    });
                }
                else {
                    account.usage[usageIndex].count++;
                    yield account.save();
                    console.log('Good API call', account.usage[usageIndex]);
                    next();
                }
            }
            else {
                account.usage.push({ date: today, count: 1 });
                yield account.save();
                next();
            }
        }
        else {
            res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.validateKey = validateKey;
//# sourceMappingURL=apikeys.js.map