"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guest_1 = require("../controllers/guest");
const cors_1 = require("../middlewares/cors");
const express_1 = require("express");
const guestRouter = (0, express_1.Router)();
guestRouter
    .route("/")
    .options(cors_1.corsWithOptions)
    .post(guest_1.postGuest);
exports.default = guestRouter;
//# sourceMappingURL=guest.js.map