import { Request } from 'express';
import { diskStorage } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const FilesArrivals = "server/public/files";
const SquareArrivals = "server/public/square";
const PhotosArrivals = "server/public/photos";
const VideosArrivals = "server/public/videos";
const MusicArrivals = "server/public/music";

export const filesStorage = diskStorage({
    destination: (
        _request: Request,
        _file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, FilesArrivals);
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        callback(null, file.originalname);
    }
});

export const squareStorage = diskStorage({
    destination: (
        _request: Request,
        _file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
            callback(null, SquareArrivals);
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
            callback(null, file.originalname);
    }
});

export const photosStorage = diskStorage({
    destination: (
        _request: Request,
        _file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
            callback(null, PhotosArrivals);
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
            callback(null, file.originalname);
    }
});

export const videosStorage = diskStorage({
    destination: (
        _request: Request,
        _file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
            callback(null, VideosArrivals);
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
            callback(null, file.originalname);
    }
});

export const musicStorage = diskStorage({
    destination: (
        _request: Request,
        _file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
            callback(null, MusicArrivals);
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
            callback(null, file.originalname);
    }
});