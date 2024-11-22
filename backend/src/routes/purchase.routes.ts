import { Router } from "express";
import { initializePurchase } from "../controllers/purchase.controller";

const router = Router();

router.post("/initialize-purchase", initializePurchase);

export default router;