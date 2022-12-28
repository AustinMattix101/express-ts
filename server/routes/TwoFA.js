"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("../middlewares/cors");
const preferedTwoFA_1 = __importDefault(require("../middlewares/preferedTwoFA"));
const auth_1 = require("../middlewares/auth");
const init_1 = require("../middlewares/init");
const TwoFA_1 = require("../controllers/TwoFA");
const TwoFARouter = (0, express_1.Router)();
TwoFARouter
    .route("/")
    .options(cors_1.corsWithOptions)
    .get(TwoFA_1.getTwoFA);
TwoFARouter
    .route("/on")
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_1.InitOnlyEmailConfirmation, TwoFA_1.getTwoFAOn);
TwoFARouter
    .route("/off")
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, TwoFA_1.getTwoFAOff);
TwoFARouter
    .route("/generate")
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, preferedTwoFA_1.default, TwoFA_1.postTwoFARegister);
TwoFARouter
    .route("/verify")
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, preferedTwoFA_1.default, TwoFA_1.postTwoFAVerify);
TwoFARouter
    .route("/validate")
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, preferedTwoFA_1.default, TwoFA_1.postTwoFAValidate);
exports.default = TwoFARouter;
//# sourceMappingURL=TwoFA.js.map