// controllers/bookingController.js

import Booking from '../model/bookingModel.js';
import Centre from '../model/centreModel.js';
import Sport from '../model/sportModel.js';
import Court from '../model/courtModel.js';
import User from '../model/userModel.js'
import mongoose from 'mongoose';

/**
 * @desc    Create a new booking
 * @route   POST /api/booking/createBooking
 * @access  Protected
 */
const createBooking = async (req, res) => {
    try {
        const { centre, sport, court, date, startTime } = req.body;
        // console.log(typeof centre)
        console.log(typeof court)
        console.log(req.body);
        
        // Validate input
        if (!centre || !sport || !court || !date || !startTime) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(centre)) {
            return res.status(400).json({ success: false, message: "Invalid centre ID." });
        }
        if (!mongoose.Types.ObjectId.isValid(sport)) {
            return res.status(400).json({ success: false, message: "Invalid sport ID." });
        }
        if (!mongoose.Types.ObjectId.isValid(court)) {
            return res.status(400).json({ success: false, message: "Invalid court ID." });
        }

        // Validate date
        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format." });
        }

        // Validate startTime format (HH:MM)
        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(startTime)) {
            return res.status(400).json({ success: false, message: "Invalid startTime format. Use HH:MM." });
        }

        // Check if Centre exists
        const centreExists = await Centre.findById(centre);
        if (!centreExists) {
            return res.status(404).json({ success: false, message: "Centre not found." });
        }

        // Check if Sport exists and belongs to the Centre
        const sportExists = await Sport.findOne({ _id: sport, centre: centre });
        if (!sportExists) {
            return res.status(404).json({ success: false, message: "Sport not found in the specified centre." });
        }

        // Check if Court exists and belongs to the Sport and Centre
        const courtExists = await Court.findById(court);
        if (!courtExists) {
            return res.status(404).json({ success: false, message: "Court not found for the specified sport and centre." });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({
            centre,
            sport,
            court,
            date: bookingDate,
            startTime
        });

        if (existingBooking) {
            return res.status(409).json({ success: false, message: "The selected slot is already booked." });
        }

        // Create the booking
        const newBooking = new Booking({
            centre,
            sport,
            court,
            date: bookingDate,
            startTime,
            user: req.user._id
        });

        const savedBooking = await newBooking.save();

        // Populate references for response
        const populatedBooking = await Booking.findById(savedBooking._id)
              // .populate('centre')
              // .populate('sport')
              // .populate('court')
              // .populate('user');
              
        res.status(201).json({
            success: true,
            message: "Booking created successfully.",
            booking: populatedBooking
        });

    } catch (error) {
        console.error("Error in createBooking:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

export { createBooking };
