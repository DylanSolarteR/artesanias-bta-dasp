import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, updatePhysicalLocation } from "../controllers/physicalLocation.controller";
import { identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", listPhysicalLocations);
router.post("/", identifyRole, createPhysicalLocation);
router.put("/:id", identifyRole, updatePhysicalLocation);
router.delete("/:id", identifyRole, deletePhysicalLocation);
export default router;