import { Router } from "express";
import { singIn, singUp, getRole, updateUser } from "../controllers/auth.controller";
import { verifyAuth, identifyRole } from "../middlewares/auth.middleware";

const router = Router();

router.post("/singin", singIn);
router.post("/singup", verifyAuth, identifyRole, singUp);
router.get("/get-role", verifyAuth, identifyRole, getRole);
router.put("/put/:id", updateUser);

export default router;