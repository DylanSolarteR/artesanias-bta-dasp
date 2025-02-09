import { Router } from "express";
import { listReportSales } from "../controllers/reportSales.controller";

const router = Router();

router.get("/list", listReportSales);

export default router;