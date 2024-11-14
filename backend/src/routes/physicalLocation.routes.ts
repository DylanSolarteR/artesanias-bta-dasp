import { Router } from "express";
import { createPhysicalLocation, deletePhysicalLocation, listPhysicalLocations, locationid, updatePhysicalLocation} from "../controllers/physicalLocation.controller";

const router = Router();

router.get("/list", listPhysicalLocations);
router.get("/list/:id", locationid);
router.post("/post", createPhysicalLocation);
router.delete("/delete/:id", deletePhysicalLocation);
router.put("/put/:id", updatePhysicalLocation);
export default router;