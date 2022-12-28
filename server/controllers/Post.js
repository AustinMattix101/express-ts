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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const Post_1 = __importDefault(require("../models/Post"));
exports.PostController = {
    default: (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield Post_1.default.find();
            yield res.json(posts);
        }
        catch (error) {
            next(error);
        }
    }),
    single: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield Post_1.default.findOne({ id: req.params.id });
            yield res.json(post);
        }
        catch (error) {
            next(error);
        }
    }),
    query: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = req.query._limit;
        const page = req.query._page;
        try {
            const posts = yield Post_1.default.find();
            const filter = [];
            if (limit) {
                for (let i = 0; i <= limit - 1; i++) {
                    filter.push(posts[i]);
                }
            }
            else if (page) {
                for (let i = 0; i <= page - 1; i++) {
                    filter.push(posts[i]);
                }
            }
            else {
                return next(new errorResponse_1.default(`Please insert a query!`, 400));
            }
            yield res.json(filter);
        }
        catch (error) {
            next(error);
        }
    }),
    post: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body.title || !req.body.body)
                return next(new errorResponse_1.default(`Please provide title and body of a new post!`, 400));
            const post = new Post_1.default(req.body);
            yield post.save();
            yield res.json(post);
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=Post.js.map