import mongoose from "mongoose";
import courtModel from "../model/courtModel.js"
import sportModel from "../model/sportModel.js" // Adjust the path as necessary

const getCourts = async (req, res) => {
  try {
    const { sport, center } = req.query; // Optional query parameters to filter by sport or center

    let filter = {};

    // If filtering by sport
    if (sport) {
      if (!mongoose.Types.ObjectId.isValid(sport)) {
        return res.status(400).json({ message: "Invalid sport ID format." });
      }
      filter.sport = sport;
    }

    // If filtering by center
    if (center) {
      if (!mongoose.Types.ObjectId.isValid(center)) {
        return res.status(400).json({ message: "Invalid center ID format." });
      }
      // Find sports associated with the center
      const sportsInCenter = await sportModel.find({ centre: center }).select("_id");
      const sportIds = sportsInCenter.map((sport) => sport._id);
      filter.sport = { $in: sportIds };
    }

    const courts = await courtModel.find(filter)
      .populate({
        path: "sport",
        select: "name",
        populate: {
          path: "centre",
          select: "name",
        },
      });

    res.status(200).json({
      success: true,
      count: courts.length,
      data: courts,
    });
  } catch (error) {
    console.error("Error fetching courts:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export default getCourts;