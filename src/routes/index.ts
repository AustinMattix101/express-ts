import { Router } from "express";
import { HelloWorldController } from "../controllers/helloWorld";
import { handleLanguageHeader } from "../middlewares/headers";
import { protect } from "../middlewares/auth";
// import { handleTokenBasedAuthentication } from "../middlewares/authentication.middleware"

export const router = Router();

router.get("/default", handleLanguageHeader, HelloWorldController.default);
router.get("/hello", protect, HelloWorldController.hello);