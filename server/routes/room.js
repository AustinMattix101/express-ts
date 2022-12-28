"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const cors_1 = require("../middlewares/cors");
const express_1 = require("express");
const roomRouter = (0, express_1.Router)();
const room_1 = require("../controllers/room");
roomRouter
    .route('/:hotelid')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, room_1.postRoom);
roomRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .put(auth_1.protect, room_1.updateRoom);
roomRouter
    .route('/:id/:hotelid')
    .options(cors_1.corsWithOptions)
    .delete(auth_1.protect, room_1.deleteRoom);
roomRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, room_1.findRooms);
roomRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, room_1.findRoom);
exports.default = roomRouter;
//# sourceMappingURL=room.js.map