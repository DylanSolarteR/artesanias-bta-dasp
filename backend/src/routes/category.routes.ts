import { Router } from "express";
import { listCategories } from "../controllers/category.controller";

const router = Router();

router.get("/list", listCategories);

export default router;