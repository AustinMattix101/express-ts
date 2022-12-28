import { Router } from "express";
import { PostController } from "../controllers/Post";

export const router = Router();

router.get("/find", PostController.default);
router.get("/:id", PostController.single);
router.get("/", PostController.query);
router.post("/", PostController.post);