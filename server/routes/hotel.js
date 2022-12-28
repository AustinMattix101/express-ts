"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const cors_1 = require("../middlewares/cors");
const express_1 = require("express");
const hotelRouter = (0, express_1.Router)();
const hotel_1 = require("../controllers/hotel");
hotelRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, auth_1.AdminProtect, hotel_1.postHotel);
hotelRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .put(auth_1.protect, auth_1.AdminProtect, hotel_1.updateHotel);
hotelRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .delete(auth_1.protect, auth_1.AdminProtect, hotel_1.deleteHotel);
hotelRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, hotel_1.findHotels);
hotelRouter
    .route('/find/:id')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, hotel_1.findHotel);
hotelRouter
    .route('/countByCity')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, hotel_1.countByCity);
hotelRouter
    .route('/countByType')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, hotel_1.countByType);
exports.default = hotelRouter;
//# sourceMappingURL=hotel.js.map