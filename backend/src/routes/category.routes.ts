import { Router } from "express";
import { listCategories } from "../controllers/category.controller";

const router = Router();

router.get("/list", listCategories);
router.get("/list:id", listCategories);

export default router;