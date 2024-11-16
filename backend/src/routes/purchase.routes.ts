import { Router } from "express";
import { completePurchase } from "../controllers/purchase.controller";

const router = Router();

router.post("/complete-purchase", completePurchase);

export default router;