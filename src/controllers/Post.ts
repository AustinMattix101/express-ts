import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import Post from "../models/Post";

export const PostController = {
    default: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await Post.find();
            await res.json(posts);
        } catch (error) {
            next(error);
        }
    },
    single: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Post.findOne({ id: req.params.id });
            await res.json(post);
        } catch (error) {
            next(error);
        }
    },
    query: async (req: Request, res: Response, next: NextFunction) => {
        const limit = (req.query._limit as unknown) as number | undefined;
        const page = (req.query._page as unknown) as number | undefined;

        try {
            const posts = await Post.find();
            const filter = [];

            if (limit) {
                for (let i = 0; i <= (limit as number) - 1; i++) {
                    filter.push(posts[i]);
                }
            } else if (page) {
                for (let i = 0; i <= (page as number) - 1; i++) {
                    filter.push(posts[i]);
                }
            } else {
                return next(new ErrorResponse(`Please insert a query!`, 400));
            }
            await res.json(filter);
        } catch (error) {
            next(error);
        }
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body.title || !req.body.body)
                return next(new ErrorResponse(`Please provide title and body of a new post!`, 400));
            const post = new Post(req.body);
            await post.save();
            await res.json(post);
        } catch (error) {
            next(error);
        }
    },
};