// backend/routes/centreRoute.js

import express from "express";
import { getCentres } from "../controller/centreController.js";

const router = express.Router();

// GET /api/centres - Fetch all centres
router.get("/getCentre", getCentres);

export default router;
