import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/list", listProducts);
router.post("/", verifyAuth, identifyRole, createProduct);
router.delete("/:id", verifyAuth, identifyRole, deleteProduct);
router.put("/:id", verifyAuth, identifyRole, updateProduct);

export default router;