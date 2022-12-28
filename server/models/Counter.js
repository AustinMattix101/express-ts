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
exports.autoIncrementModelID = void 0;
const mongoose_1 = require("mongoose");
const CounterSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number,
        default: 0,
    },
    etc: {
        type: String,
    }
}, { timestamps: true });
CounterSchema.index({ seq: 1 }, { unique: true });
CounterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified) {
            next();
            return;
        }
        this.seq += 1;
    });
});
const autoIncrementModelID = (modelName, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { seq } = yield Counter.findOneAndUpdate({ id: modelName }, { $inc: { seq: 1 } }, { new: true, upsert: true });
        return seq;
    }
    catch (error) {
        return next(error);
    }
});
exports.autoIncrementModelID = autoIncrementModelID;
const Counter = (0, mongoose_1.model)('Counter', CounterSchema);
exports.default = Counter;
//# sourceMappingURL=Counter.js.map