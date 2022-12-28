import { protect } from "../middlewares/auth";
import { corsWithOptions } from "../middlewares/cors";
import { Router } from "express";
const roomRouter = Router();

import { postRoom, updateRoom, deleteRoom, findRooms, findRoom } from "../controllers/room";

    // Room
roomRouter
    .route('/:hotelid')
    .options(corsWithOptions)
    .post(protect, postRoom);

roomRouter
    .route('/:id')
    .options(corsWithOptions)
    .put(protect, updateRoom);

roomRouter
    .route('/:id/:hotelid')
    .options(corsWithOptions)
    .delete(protect, deleteRoom);

roomRouter
    .route('/')
    .options(corsWithOptions)
    .get(protect, findRooms);

roomRouter
    .route('/:id')
    .options(corsWithOptions)
    .get(protect, findRoom);

export default roomRouter;
