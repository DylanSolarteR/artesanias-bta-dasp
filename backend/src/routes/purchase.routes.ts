import { Router } from "express";
import { completePurchase, initializePurchase, rejectPurchase } from "../controllers/purchase.controller";

const router = Router();

router.post("/initialize-purchase", initializePurchase);
router.post("/complete-purchase", completePurchase);
router.post("/reject-purchase", rejectPurchase);

export default router;