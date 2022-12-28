import { Request } from 'express';
// import { FileFilterCallback } from 'multer';
import ErrorResponse from './errorResponse';

export const filesFilter = (_request: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        !file.originalname.match(/\.(txt|json|js|jsx|ts|tsx|py|cpp|c|vb|vbs|cs|java|php|css|sass|xml|html|md|pdf|docx|bat|cmd|ps1|sh|zsh)$/)
        )
        return callback(new ErrorResponse('You can upload only specific files extentions, learn more in documentation!', 400), false);
    else
        return callback(null, true);
}

export const squareFilter = (_request: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        !file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg|eps)$/)
        )
        return callback(new ErrorResponse('You can upload only specific support square image file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
}

export const photosFilter = (_request: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        !file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg|eps)$/)
        )
        return callback(new ErrorResponse('You can upload only specific support image file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
}

export const videosFilter = (_request: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        !file.originalname.match(/\.(mp4|3pg|avi|f4v|flv|m4v|mkv|mov|mpeg|mpg|mts|ts|vob|webm|wmv)$/)
        )
        return callback(new ErrorResponse('You can upload only specific support video file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
}

export const musicFilter = (_request: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        !file.originalname.match(/\.(mp3|aac|m4a|ac3|wav|ogg|opus|flac|m4b|mp4)$/)
        )
        return callback(new ErrorResponse('You can upload only specific support music file extentions, learn more in documentation!', 400), false);
    else
        callback(null, true);
}