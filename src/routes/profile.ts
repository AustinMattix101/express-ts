import { Router } from 'express';
import { protect, AdminProtect } from "../middlewares/auth";
import {
    InitOnlyEmailConfirmation,
    InitpreferedTwoFAOption
} from "../middlewares/init.js";
import { corsWithOptions } from "../middlewares/cors";

import { findProfile, findProfileByUsername, writeProfile, updateProfile, clearProfile } from "../controllers/profile";

import { updateProfileByUsername, deleteProfileByUsername } from "../controllers/profile"; // Admin Only

const profilesRouter = Router();

profilesRouter
    .route('/')
    .options(corsWithOptions)
    .get(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        findProfile,
    );

profilesRouter  // init email conf...
    .route('/:username')
    .options(corsWithOptions)
    .get(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        findProfileByUsername,
    );

profilesRouter
    .route('/')
    .options(corsWithOptions)
    .post(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        writeProfile,
    );

profilesRouter
    .route('/')
    .options(corsWithOptions)
    .put(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        updateProfile,
    );

profilesRouter
    .route('/')
    .options(corsWithOptions)
    .delete(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        clearProfile,
    );

profilesRouter
    .route('/:username')
    .options(corsWithOptions)
    .put(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        AdminProtect,
        updateProfileByUsername,
    );

profilesRouter
    .route('/:username')
    .options(corsWithOptions)
    .delete(
        protect,
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption,
        AdminProtect,
        deleteProfileByUsername,
    );

export default profilesRouter;