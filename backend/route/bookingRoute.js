// routes/bookingRoutes.js

import express from 'express';
import { createBooking } from '../controller/bookingController.js';
import { protect } from '../middleware/authMiddleware.js'; // Authentication middleware

const router = express.Router();

router.post('/createBooking', protect, createBooking);

export default router;
