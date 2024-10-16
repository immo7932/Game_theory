import express from "express";
import getCourts from "../controller/courtController.js";

const router = express.Router();

// GET /api/centres - Fetch all centres
router.get("/getCourt", getCourts);

export default router;
