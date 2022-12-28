import { Schema, model, InferSchemaType } from "mongoose";

const APISchema = new Schema({
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    host: {
        type: String,
    },
    usage: [{ date: { type: String }, count: { type: Number, default: 0 } }],

}, { timestamps: true });

declare interface IAPI extends InferSchemaType<typeof APISchema> { }

export default model<IAPI>('API', APISchema);