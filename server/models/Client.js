"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Client', ClientSchema);
//# sourceMappingURL=Client.js.map