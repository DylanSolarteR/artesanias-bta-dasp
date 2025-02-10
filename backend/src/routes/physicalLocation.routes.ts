import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, updatePhysicalLocation } from "../controllers/physicalLocation.controller";
import { identifyRole } from "../middlewares/auth.middleware";
import { deleteFileAfterRequest, uploadImageMiddleware } from "../middlewares/file.middleware";

const router = Router();

router.get("/", listPhysicalLocations);
router.post("/", identifyRole, uploadImageMiddleware.single('imgFile'), deleteFileAfterRequest, createPhysicalLocation);
router.put("/:id", identifyRole, uploadImageMiddleware.single('imgFile'), deleteFileAfterRequest, updatePhysicalLocation);
router.delete("/:id", identifyRole, deletePhysicalLocation);
export default router;