import { Router } from "express";
import { singIn, singUp, getRole } from "../controllers/auth.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.post("/singin", singIn);
router.post("/singup", verifyAuth, identifyRole, singUp);
router.get("/get-role", verifyAuth, identifyRole, getRole);

export default router;