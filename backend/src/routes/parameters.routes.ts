
import { Router } from "express";
import { getDeparments, getDocTypes } from "../controllers/parameters.controller";

const router = Router();

router.get('/departments', getDeparments);
router.get('/doc-types', getDocTypes);

export default router;