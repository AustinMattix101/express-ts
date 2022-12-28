import { Router } from "express";
import { corsWithOptions } from "../middlewares/cors";
import PreferedTwoFA from "../middlewares/preferedTwoFA";
import { protect } from "../middlewares/auth";
import {
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption
    } from "../middlewares/init";
import {
        getTwoFA,
        getTwoFAOn,
        getTwoFAOff,
        postTwoFARegister,
        postTwoFAVerify,
        postTwoFAValidate,
} from "../controllers/TwoFA";

const TwoFARouter = Router();

TwoFARouter
        .route("/")
        .options(corsWithOptions)
        .get(getTwoFA);

TwoFARouter
        .route("/on")
        .options(corsWithOptions)
        .get(
                protect,
                InitOnlyEmailConfirmation,
                getTwoFAOn
        );

TwoFARouter
        .route("/off")
        .options(corsWithOptions)
        .get(
                protect,
                InitOnlyEmailConfirmation,
                InitpreferedTwoFAOption,
                getTwoFAOff
        );

TwoFARouter
        .route("/generate")
        .options(corsWithOptions)
        .post(
                protect,
                InitOnlyEmailConfirmation,
                PreferedTwoFA,
                postTwoFARegister
        );

TwoFARouter
        .route("/verify")
        .options(corsWithOptions)
        .post(
                protect,
                InitOnlyEmailConfirmation,
                PreferedTwoFA,
                postTwoFAVerify
        );

TwoFARouter
        .route("/validate")
        .options(corsWithOptions)
        .post(
                protect,
                InitOnlyEmailConfirmation,
                PreferedTwoFA,
                postTwoFAValidate
        );

export default TwoFARouter;