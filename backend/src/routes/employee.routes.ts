import { Router } from "express";
import { listEmployees, updateEmployee } from "../controllers/employee.controller";
import { identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/list", identifyRole, listEmployees);
router.get("/list/:id", identifyRole, listEmployees);
router.put("/", identifyRole, updateEmployee);

export default router;