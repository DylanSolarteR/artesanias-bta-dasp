import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, updatePhysicalLocation } from "../controllers/physicalLocation.controller";

const router = Router();

router.get("/list", listPhysicalLocations);
router.post("/", createPhysicalLocation);
export default router;