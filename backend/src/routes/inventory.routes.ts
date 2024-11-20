import { Router } from "express";
import { createInventory, updateInventory } from "../controllers/inventory.Controller";

const router = Router();

router.post("/post", createInventory);
router.put("/put/:id", updateInventory);

export default router;