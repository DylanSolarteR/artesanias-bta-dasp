import { Router } from "express";
import { singIn, singUp, getRole, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.post("/singin", singIn);
router.post("/singup", verifyAuth, identifyRole, singUp);
router.get("/get-role", verifyAuth, identifyRole, getRole);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;