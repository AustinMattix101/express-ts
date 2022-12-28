"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Post_1 = require("../controllers/Post");
exports.router = (0, express_1.Router)();
exports.router.get("/find", Post_1.PostController.default);
exports.router.get("/:id", Post_1.PostController.single);
exports.router.get("/", Post_1.PostController.query);
exports.router.post("/", Post_1.PostController.post);
//# sourceMappingURL=Post.js.map