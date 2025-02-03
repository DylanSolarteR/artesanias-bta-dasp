import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";
import { uploadImageMiddleware } from "../middlewares/file.middleware";


const router = Router();

router.get("/list", listProducts);
router.post("/", verifyAuth, identifyRole, uploadImageMiddleware.single('imgFile'), createProduct);
router.delete("/:id", verifyAuth, identifyRole, deleteProduct);
router.put("/:id", verifyAuth, identifyRole, updateProduct);

export default router;