import { Schema, model, InferSchemaType } from "mongoose";
import { autoIncrementModelID } from "./Counter";

const PostSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1,
    },
    excerpt: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

declare interface IPost extends InferSchemaType<typeof PostSchema> { }

PostSchema.pre("save", async function (next) {
    try {
        if (!this.isNew) {
            next();
            return;
        }

        this.id = await autoIncrementModelID('UniquedPost', next);
    } catch (error) {
        next(error as any);
    }
});

export default model<IPost>('Post', PostSchema);