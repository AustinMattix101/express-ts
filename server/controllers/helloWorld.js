"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldController = void 0;
exports.HelloWorldController = {
    default: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    hello: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        res.json(`Hey, ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}`);
    }),
};
//# sourceMappingURL=helloWorld.js.map