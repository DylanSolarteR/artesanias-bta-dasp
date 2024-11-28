import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, updatePhysicalLocation } from "../controllers/physicalLocation.controller";

const router = Router();

router.get("/list", listPhysicalLocations);
router.get("/list/:id", listPhysicalLocations);
router.post("/", createPhysicalLocation);
router.delete("/:id", deletePhysicalLocation);
router.put("/:id", updatePhysicalLocation);
export default router;