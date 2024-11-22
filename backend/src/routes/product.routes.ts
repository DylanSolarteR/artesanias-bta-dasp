import { Router } from "express";
import { listProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const router = Router();

router.get("/list", listProducts);
router.post("/post", createProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/put/:id", updateProduct);

export default router;