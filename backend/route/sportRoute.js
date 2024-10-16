import { getSportsByCentre } from "../controller/sportController.js";
import express from "express";
const router = express.Router();

router.get("/getSport", getSportsByCentre);

export default router;