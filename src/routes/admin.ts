import { Router } from "express";
const router = Router();
import { corsWithOptions } from "../middlewares/cors";
import { getAdminData } from "../controllers/admin";
import { protect, AdminProtect } from "../middlewares/auth";
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
        AdminProtect, getAdminData
    );

export default router;