import { Router } from "express";
import { singIn, singUp } from "../controllers/auth.controller";
import { verifyAuth, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/singin", singIn);
router.post("/singup", verifyAuth, isAdmin, singUp);

export default router;