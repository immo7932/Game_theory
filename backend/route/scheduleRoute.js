import express from "express";
import { getAvailableSlots } from "../controller/scheduleController.js"

const router = express.Router();

// Define the route for fetching available slots
// Example Endpoint: GET /api/schedule/availableSlots?centre=<id>&sport=<id>&court=<id>&date=YYYY-MM-DD
router.get("/availableSlots", getAvailableSlots);

export default router;
