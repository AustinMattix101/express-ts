import { Router } from 'express';
const uploadRouter = Router();
import { protect } from "../middlewares/auth";
import { corsWithOptions } from "../middlewares/cors";
import { InitOnlyEmailConfirmation, InitpreferedTwoFAOption } from "../middlewares/init";

import { postUpload } from "../controllers/upload";
import { UploadFiles, UploadMusic, UploadPhotos, UploadSquare, UploadVideos } from "../middlewares/upload";

uploadRouter
    .route('/')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            UploadFiles('Files', 5),
            postUpload
            )

uploadRouter
    .route('/photo')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            UploadPhotos('Photos', 5),
            postUpload
            )

uploadRouter
    .route('/square')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            UploadSquare('Squares', 5),
            postUpload
            )

uploadRouter
    .route('/video')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            UploadVideos('Videos', 5),
            postUpload
            )

uploadRouter
    .route('/music')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            UploadMusic('Music', 5),
            postUpload
            )

export default uploadRouter;