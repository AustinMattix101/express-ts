"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = require("../controllers/auth");
const init_1 = require("../middlewares/init");
const cors_1 = require("../middlewares/cors");
const auth_2 = require("../middlewares/auth");
router.route("/")
    .options(cors_1.corsWithOptions)
    .get(auth_1.getHello);
router.route("/register")
    .options(cors_1.corsWithOptions)
    .post(auth_1.register);
router.route("/login")
    .options(cors_1.corsWithOptions)
    .post(auth_1.login);
router.route("/forgotpassword")
    .options(cors_1.corsWithOptions)
    .post(auth_1.forgotpassword);
router.route("/resetpassword/:resetToken")
    .options(cors_1.corsWithOptions)
    .put(auth_1.resetpassword);
router.route("/sendconfirmemail")
    .options(cors_1.corsWithOptions)
    .post(auth_1.sendEmailConfirm);
router.route("/verifyemail")
    .options(cors_1.corsWithOptions)
    .post(auth_1.verifyEmail);
router.route("/findemail")
    .options(cors_1.corsWithOptions)
    .post(auth_1.findEmailByUsername);
router.route("/confirmpassword")
    .options(cors_1.corsWithOptions)
    .post(auth_2.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, auth_1.altPasswordConfirm);
router.route("/delete/:username")
    .options(cors_1.corsWithOptions)
    .delete(auth_2.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, auth_2.AdminProtect, auth_1.deleteAccountByUsername);
router.route("/changeemail")
    .options(cors_1.corsWithOptions)
    .put(auth_2.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, auth_1.changeEmail);
router.route("/changeusername")
    .options(cors_1.corsWithOptions)
    .put(auth_2.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, auth_1.changeUsername);
exports.default = router;
//# sourceMappingURL=auth.js.map