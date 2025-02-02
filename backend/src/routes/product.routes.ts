import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";
import multer from "multer";

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"));
    }
};

const uploadMiddleware = multer({
    dest: "uploads/",
    fileFilter,
    limits: {
        // fileSize: 200 * 1024 // 200 KB
    }
});

const router = Router();

router.get("/list", listProducts);
router.post("/", verifyAuth, identifyRole, uploadMiddleware.single('imgFile'), createProduct);
router.delete("/:id", verifyAuth, identifyRole, deleteProduct);
router.put("/:id", verifyAuth, identifyRole, updateProduct);

export default router;