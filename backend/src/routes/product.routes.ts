import { Router } from "express";
import { listProducts } from "../controllers/user";

const router = Router();

router.get("/list", listProducts);

export default router;