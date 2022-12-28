// src/controllers/helloWorld.ts

import { NextFunction, Request, Response } from "express";

export const HelloWorldController = {
    default: async (req: Request<never, never, never, never>, res: Response, _next: NextFunction) => {
        let message;

        switch (req.language) {
            default:
            case "en": {
                message = "Hello, World!";
                break;
            }
            case "es": {
                message = "¡Hola, mundo!";
                break;
            }
            case "it": {
                message = "Ciao, mondo!";
                break;
            }
            case "cn": {
                message = "你好世界!";
                break;
            }
        }

        res.json(message);
    },
    hello: async (req: Request<never, never, never, never>, res: Response, _next: NextFunction) => {
        res.json(`Hey, ${req.user?.username}`);
    },
};