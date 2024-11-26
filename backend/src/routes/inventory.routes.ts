import { Router } from "express";
import { createInventory, updateInventory } from "../controllers/inventory.controller";

const router = Router();

router.post("/post", createInventory);
router.put("/put/:id", updateInventory);

export default router;