import { Router } from "express";
import { listEmployees, updateEmployee, deleteEmployee } from "../controllers/employee.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyAuth, listEmployees);
router.get("/:id", verifyAuth, listEmployees);
router.put("/", verifyAuth, updateEmployee);
router.delete("/:id", verifyAuth, deleteEmployee);

export default router;