import { getAPI, getMattixAPI, postRegisterAPI, getCheeses, postCheeses } from "../controllers/api";
import { cors, corsWithOptions } from "../middlewares/cors";
import { Router } from "express";
const apiRouter = Router();
import { validateKey } from '../middlewares/apikeys';

apiRouter
    .route("/")
    .options(corsWithOptions)
    .get(cors, getAPI)
    .post(cors, getAPI)
    .put(cors, getAPI)
    .delete(cors, getAPI);

apiRouter
    .route("/mattix")
    .options(corsWithOptions)
    .get(cors, getMattixAPI);

apiRouter
    .route("/register")
    .options(corsWithOptions)
    .post(cors, postRegisterAPI);

apiRouter
    .route("/cheese")
    .options(corsWithOptions)
    .get(cors, validateKey, getCheeses);

apiRouter
    .route("/cheese")
    .options(corsWithOptions)
    .post(cors, validateKey, postCheeses);

export default apiRouter;