"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const helloWorld_1 = require("../controllers/helloWorld");
const headers_1 = require("../middlewares/headers");
const auth_1 = require("../middlewares/auth");
exports.router = (0, express_1.Router)();
exports.router.get("/default", headers_1.handleLanguageHeader, helloWorld_1.HelloWorldController.default);
exports.router.get("/hello", auth_1.protect, helloWorld_1.HelloWorldController.hello);
//# sourceMappingURL=index.js.map