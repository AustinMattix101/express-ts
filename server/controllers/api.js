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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCheeses = exports.getCheeses = exports.postRegisterAPI = exports.getMattixAPI = exports.getAPI = void 0;
const apikeys_1 = require("../middlewares/apikeys");
const data_1 = require("../data");
function getAPI(_req, res, _next) {
    res.status(200).json({ message: `Welcome to Mattix API` });
}
exports.getAPI = getAPI;
function getMattixAPI(_req, res, _next) {
    res.status(200).json({
        message: `Welcome to Mattix Team API! ;)`
    });
}
exports.getMattixAPI = getMattixAPI;
const postRegisterAPI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield (0, apikeys_1.createUser)(email, req);
        console.log('USER LIST');
        console.log(user);
        if (user) {
            res.status(201).send({ data: user });
        }
        else {
            res.status(201).send({ data: { error: "Duplicated Email Address" } });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.postRegisterAPI = postRegisterAPI;
const getCheeses = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date().toISOString().split('T')[0];
        console.log(today);
        res.status(200).send({
            data: data_1.cheeses,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCheeses = getCheeses;
const postCheeses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cheese = {
            _id: Date.now(),
            name: req.body.cheese,
        };
        data_1.cheeses.push(cheese);
        res.status(201).send({
            data: cheese,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postCheeses = postCheeses;
//# sourceMappingURL=api.js.map