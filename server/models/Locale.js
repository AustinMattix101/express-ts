"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NameSpaceSchema = new mongoose_1.Schema({
    index: {
        type: Object,
        required: true
    },
    navigation: {
        type: Object,
        required: true
    },
}, { timestamps: true });
const LocaleSchema = new mongoose_1.Schema({
    language_code: {
        type: String,
        required: true,
        unique: true
    },
    namespaces: NameSpaceSchema,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Locale', LocaleSchema);
//# sourceMappingURL=Locale.js.map