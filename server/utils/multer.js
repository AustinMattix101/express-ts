"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicFilter = exports.videosFilter = exports.photosFilter = exports.squareFilter = exports.filesFilter = void 0;
const errorResponse_1 = __importDefault(require("./errorResponse"));
const filesFilter = (_request, file, callback) => {
    if (!file.originalname.match(/\.(txt|json|js|jsx|ts|tsx|py|cpp|c|vb|vbs|cs|java|php|css|sass|xml|html|md|pdf|docx|bat|cmd|ps1|sh|zsh)$/))
        return callback(new errorResponse_1.default('You can upload only specific files extentions, learn more in documentation!', 400), false);
    else
        return callback(null, true);
};
exports.filesFilter = filesFilter;
const squareFilter = (_request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg|eps)$/))
        return callback(new errorResponse_1.default('You can upload only specific support square image file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
};
exports.squareFilter = squareFilter;
const photosFilter = (_request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg|eps)$/))
        return callback(new errorResponse_1.default('You can upload only specific support image file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
};
exports.photosFilter = photosFilter;
const videosFilter = (_request, file, callback) => {
    if (!file.originalname.match(/\.(mp4|3pg|avi|f4v|flv|m4v|mkv|mov|mpeg|mpg|mts|ts|vob|webm|wmv)$/))
        return callback(new errorResponse_1.default('You can upload only specific support video file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
};
exports.videosFilter = videosFilter;
const musicFilter = (_request, file, callback) => {
    if (!file.originalname.match(/\.(mp3|aac|m4a|ac3|wav|ogg|opus|flac|m4b|mp4)$/))
        return callback(new errorResponse_1.default('You can upload only specific support music file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
};
exports.musicFilter = musicFilter;
//# sourceMappingURL=multer.js.map