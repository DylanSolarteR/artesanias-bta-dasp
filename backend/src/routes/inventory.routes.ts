import { Router } from "express";
import { createInventory, listInventory, updateInventory,  } from "../controllers/inventory.controller";

const router = Router();

router.post("/post", createInventory);
router.get("/list", listInventory);
router.get("/list/:id", listInventory);
router.put("/put/:id", updateInventory);

export default router;