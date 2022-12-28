import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    }
}, { timestamps: true });

export default model('Client', ClientSchema);