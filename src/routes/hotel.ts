import { protect, AdminProtect } from "../middlewares/auth";
import { corsWithOptions } from "../middlewares/cors";
import { Router } from "express";
const hotelRouter = Router();

import { postHotel, updateHotel, deleteHotel, findHotels, findHotel, countByCity, countByType } from "../controllers/hotel";

    // Hotel
hotelRouter
    .route('/')
    .options(corsWithOptions)
    .post(protect, AdminProtect, postHotel);

hotelRouter
    .route('/:id')
    .options(corsWithOptions)
    .put(protect, AdminProtect, updateHotel);

hotelRouter
    .route('/:id')
    .options(corsWithOptions)
    .delete(protect, AdminProtect, deleteHotel);

hotelRouter
    .route('/')
    .options(corsWithOptions)
    .get(protect, findHotels);

hotelRouter
    .route('/find/:id')
    .options(corsWithOptions)
    .get(protect, findHotel);

    // Hotel Query
hotelRouter
    .route('/countByCity')
    .options(corsWithOptions)
    .get(protect, countByCity);

hotelRouter
    .route('/countByType')
    .options(corsWithOptions)
    .get(protect, countByType);

export default hotelRouter;
