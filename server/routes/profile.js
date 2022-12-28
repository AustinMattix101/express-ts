"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const init_js_1 = require("../middlewares/init.js");
const cors_1 = require("../middlewares/cors");
const profile_1 = require("../controllers/profile");
const profile_2 = require("../controllers/profile");
const profilesRouter = (0, express_1.Router)();
profilesRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, profile_1.findProfile);
profilesRouter
    .route('/:username')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, profile_1.findProfileByUsername);
profilesRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, profile_1.writeProfile);
profilesRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .put(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, profile_1.updateProfile);
profilesRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .delete(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, profile_1.clearProfile);
profilesRouter
    .route('/:username')
    .options(cors_1.corsWithOptions)
    .put(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, auth_1.AdminProtect, profile_2.updateProfileByUsername);
profilesRouter
    .route('/:username')
    .options(cors_1.corsWithOptions)
    .delete(auth_1.protect, init_js_1.InitOnlyEmailConfirmation, init_js_1.InitpreferedTwoFAOption, auth_1.AdminProtect, profile_2.deleteProfileByUsername);
exports.default = profilesRouter;
//# sourceMappingURL=profile.js.map