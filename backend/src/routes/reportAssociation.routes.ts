import { Router } from "express";
import { listTransaction } from "../controllers/reportAssociation.controller";

const router = Router();

router.get("/list", listTransaction);

export default router;