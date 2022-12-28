"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Project', ProjectSchema);
//# sourceMappingURL=Project.js.map