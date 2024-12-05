import { Router } from "express";
import { createInventory, listInventory, updateInventory, } from "../controllers/inventory.controller";

const router = Router();

router.post("/", createInventory);
router.get("/list", listInventory);
router.put("/:id", updateInventory);

export default router;