import { NextFunction } from "express";
import multer from "multer";
import { MulterRequest } from "../custom";
import fs from "fs";
import { Response, Request } from "express";

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"));
    }
};

export const uploadImageMiddleware = multer({
    dest: "uploads/",
    fileFilter,
    limits: {
        // fileSize: 200 * 1024 // 200 KB
    },

});

export function deleteFileAfterRequest(req: MulterRequest, res: Response, next: NextFunction) {
    res.on('finish', () => {
        const file = req.file;
        if (file) {
            const path = file.path
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })
    next();
}