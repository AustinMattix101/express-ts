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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Counter_1 = require("./Counter");
const PostSchema = new mongoose_1.Schema({
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
PostSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isNew) {
                next();
                return;
            }
            this.id = yield (0, Counter_1.autoIncrementModelID)('UniquedPost', next);
        }
        catch (error) {
            next(error);
        }
    });
});
exports.default = (0, mongoose_1.model)('Post', PostSchema);
//# sourceMappingURL=Post.js.map