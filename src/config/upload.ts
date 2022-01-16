import crypto from 'crypto';
import { request } from 'express';
import multer from 'multer';
import { resolve } from 'path';

// Function default
export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    // criando um hash pro nome
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};
