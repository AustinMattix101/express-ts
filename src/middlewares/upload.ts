import multer from 'multer';
import {
    filesStorage,
    musicStorage,
    photosStorage,
    squareStorage,
    videosStorage
}
from '../config/multer';
import {
    filesFilter,
    musicFilter,
    photosFilter,
    squareFilter,
    videosFilter
} from '../utils/multer';

/**
 *
 * @param key string
 * @param maxCount number
 * @returns Destination > server/public/files
 */
export const UploadFiles = (key: string, maxCount: number) => multer({ storage: filesStorage, fileFilter: filesFilter }).array(key, maxCount);

/**
 *
 * @param key string
 * @param maxCount number
 * @returns Destination > server/public/square
 */
export const UploadPhotos = (key: string, maxCount: number) => multer({ storage: photosStorage, fileFilter: photosFilter }).array(key, maxCount);

/**
 *
 * @param key string
 * @param maxCount number
 * @returns Destination > server/public/photos
 */
export const UploadSquare = (key: string, maxCount: number) => multer({ storage: squareStorage, fileFilter: squareFilter }).array(key, maxCount);

/**
 *
 * @param key string
 * @param maxCount number
 * @returns Destination > server/public/videos
 */
export const UploadVideos = (key: string, maxCount: number) => multer({ storage: videosStorage, fileFilter: videosFilter }).array(key, maxCount);

/**
 *
 * @param key string
 * @param maxCount number
 * @returns Destination > server/public/music
 */
export const UploadMusic = (key: string, maxCount: number) => multer({ storage: musicStorage, fileFilter: musicFilter }).array(key, maxCount);