"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const APISchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('API', APISchema);
//# sourceMappingURL=API.js.map