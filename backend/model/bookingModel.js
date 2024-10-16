import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centres',
      required: true,
    },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sports',
      required: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courts',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // Storing time in "HH:MM" format.
      required: true,
    },
    endTime: {
      type: String, // Automatically inferred from the startTime.
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the 'User' schema instead of customerName.
      required: true,
    },
  });
  
  BookingSchema.pre('validate', function (next) {
    // Automatically set endTime as 1 hour after startTime.
    const startTimeArray = this.startTime.split(':');
    const endHour = parseInt(startTimeArray[0]) + 1;
    this.endTime = `${endHour}:${startTimeArray[1]}`; // Use backticks for template literals
    next();
});
  
const booking = mongoose.model('Bookings', BookingSchema);

export default booking;