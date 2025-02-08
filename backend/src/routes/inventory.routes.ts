import { Router } from "express";
import { createInventory, listInventory, updateInventory, } from "../controllers/inventory.controller";

const router = Router();

router.post("/", createInventory);
router.get("/list", listInventory);
router.put("/", updateInventory);

export default router;