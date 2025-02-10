import { Router } from "express";
import {
    completePurchase,
    initializePurchase,
    rejectPurchase,
    completePosPurchase
} from "../controllers/purchase.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/initialize-purchase", initializePurchase);
router.post("/complete-purchase", completePurchase);
router.post("/reject-purchase", rejectPurchase);
router.post("/pos-purchase", verifyAuth, completePosPurchase);

export default router;