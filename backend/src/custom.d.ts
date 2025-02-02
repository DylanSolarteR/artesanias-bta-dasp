import { Request } from "express";
import multer from "multer";

export interface MulterRequest extends Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
}