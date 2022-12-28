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
exports.postUpload = void 0;
const postUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.status(201)
            .setHeader("Content-Type", "application/json")
            .json({
            data: {
                file: req.file,
                files: req.files
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postUpload = postUpload;
//# sourceMappingURL=upload.js.map