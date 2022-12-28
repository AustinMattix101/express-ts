"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const cors_1 = require("../middlewares/cors");
const admin_1 = require("../controllers/admin");
const auth_1 = require("../middlewares/auth");
const init_1 = require("../middlewares/init");
router.route("/")
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, auth_1.AdminProtect, admin_1.getAdminData);
exports.default = router;
//# sourceMappingURL=admin.js.map