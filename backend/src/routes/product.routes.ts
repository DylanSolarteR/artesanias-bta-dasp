import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";
import { uploadImageMiddleware, deleteFileAfterRequest } from "../middlewares/file.middleware";


const router = Router();

router.get("/list", listProducts);
router.post("/", verifyAuth, identifyRole, uploadImageMiddleware.single('imgFile'), deleteFileAfterRequest, createProduct);
router.delete("/:id", verifyAuth, identifyRole, deleteProduct);
router.put("/:id", verifyAuth, identifyRole, uploadImageMiddleware.single('imgFile'), deleteFileAfterRequest, updateProduct);

export default router;