import { Router } from "express";
const router = Router();
import { corsWithOptions } from "../middlewares/cors";
import { getPrivateData } from "../controllers/private";
import { protect } from "../middlewares/auth";
import {
    InitOnlyEmailConfirmation,
    InitpreferedTwoFAOption
} from "../middlewares/init";

router.route("/")
    .options(corsWithOptions)
    .get(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        getPrivateData
    );

export default router;