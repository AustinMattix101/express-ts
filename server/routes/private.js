"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const cors_1 = require("../middlewares/cors");
const private_1 = require("../controllers/private");
const auth_1 = require("../middlewares/auth");
const init_1 = require("../middlewares/init");
router.route("/")
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, private_1.getPrivateData);
exports.default = router;
//# sourceMappingURL=private.js.map