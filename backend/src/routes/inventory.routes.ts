import { Router } from "express";
import { createInventory, listInventory, updateInventory, } from "../controllers/inventory.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyAuth, createInventory);
router.get("/", verifyAuth, listInventory);
router.put("/", verifyAuth, updateInventory);

export default router;