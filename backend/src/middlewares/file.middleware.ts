import multer from "multer";

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