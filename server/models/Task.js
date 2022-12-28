"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    text: String,
    day: String,
    reminder: {
        type: Boolean,
        default: false
    },
    postBy: {
        type: String,
        required: [true, " Please povide who post this task! "],
    },
}, { timestamps: true });
const Task = (0, mongoose_1.model)("Tasks", TaskSchema);
exports.default = Task;
//# sourceMappingURL=Task.js.map