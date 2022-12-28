"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadRouter = (0, express_1.Router)();
const auth_1 = require("../middlewares/auth");
const cors_1 = require("../middlewares/cors");
const init_1 = require("../middlewares/init");
const upload_1 = require("../controllers/upload");
const upload_2 = require("../middlewares/upload");
uploadRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, (0, upload_2.UploadFiles)('Files', 5), upload_1.postUpload);
uploadRouter
    .route('/photo')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, (0, upload_2.UploadPhotos)('Photos', 5), upload_1.postUpload);
uploadRouter
    .route('/square')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, (0, upload_2.UploadSquare)('Squares', 5), upload_1.postUpload);
uploadRouter
    .route('/video')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, (0, upload_2.UploadVideos)('Videos', 5), upload_1.postUpload);
uploadRouter
    .route('/music')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, init_1.InitOnlyEmailConfirmation, init_1.InitpreferedTwoFAOption, (0, upload_2.UploadMusic)('Music', 5), upload_1.postUpload);
exports.default = uploadRouter;
//# sourceMappingURL=uploadFile.js.map