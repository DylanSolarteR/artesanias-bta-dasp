import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, updatePhysicalLocation } from "../controllers/physicalLocation.controller";

const router = Router();

router.get("/list", listPhysicalLocations);
router.post("/", createPhysicalLocation);
router.delete("/:id", deletePhysicalLocation);
router.put("/:id", updatePhysicalLocation);
export default router;