import { postGuest } from "../controllers/guest";
import { corsWithOptions } from "../middlewares/cors";
import { Router} from "express";
const guestRouter = Router();

guestRouter
    .route("/")
    .options(corsWithOptions)
    .post(postGuest);

export default guestRouter;