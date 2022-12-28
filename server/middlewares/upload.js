"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMusic = exports.UploadVideos = exports.UploadSquare = exports.UploadPhotos = exports.UploadFiles = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../config/multer");
const multer_3 = require("../utils/multer");
const UploadFiles = (key, maxCount) => (0, multer_1.default)({ storage: multer_2.filesStorage, fileFilter: multer_3.filesFilter }).array(key, maxCount);
exports.UploadFiles = UploadFiles;
const UploadPhotos = (key, maxCount) => (0, multer_1.default)({ storage: multer_2.photosStorage, fileFilter: multer_3.photosFilter }).array(key, maxCount);
exports.UploadPhotos = UploadPhotos;
const UploadSquare = (key, maxCount) => (0, multer_1.default)({ storage: multer_2.squareStorage, fileFilter: multer_3.squareFilter }).array(key, maxCount);
exports.UploadSquare = UploadSquare;
const UploadVideos = (key, maxCount) => (0, multer_1.default)({ storage: multer_2.videosStorage, fileFilter: multer_3.videosFilter }).array(key, maxCount);
exports.UploadVideos = UploadVideos;
const UploadMusic = (key, maxCount) => (0, multer_1.default)({ storage: multer_2.musicStorage, fileFilter: multer_3.musicFilter }).array(key, maxCount);
exports.UploadMusic = UploadMusic;
//# sourceMappingURL=upload.js.map