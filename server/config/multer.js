"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicStorage = exports.videosStorage = exports.photosStorage = exports.squareStorage = exports.filesStorage = void 0;
const multer_1 = require("multer");
const FilesArrivals = "server/public/files";
const SquareArrivals = "server/public/square";
const PhotosArrivals = "server/public/photos";
const VideosArrivals = "server/public/videos";
const MusicArrivals = "server/public/music";
exports.filesStorage = (0, multer_1.diskStorage)({
    destination: (_request, _file, callback) => {
        callback(null, FilesArrivals);
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});
exports.squareStorage = (0, multer_1.diskStorage)({
    destination: (_request, _file, callback) => {
        callback(null, SquareArrivals);
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});
exports.photosStorage = (0, multer_1.diskStorage)({
    destination: (_request, _file, callback) => {
        callback(null, PhotosArrivals);
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});
exports.videosStorage = (0, multer_1.diskStorage)({
    destination: (_request, _file, callback) => {
        callback(null, VideosArrivals);
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});
exports.musicStorage = (0, multer_1.diskStorage)({
    destination: (_request, _file, callback) => {
        callback(null, MusicArrivals);
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});
//# sourceMappingURL=multer.js.map