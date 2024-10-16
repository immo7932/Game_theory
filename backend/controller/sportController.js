// backend/controller/sport.controller.js

import Sport from "../model/sportModel.js"

// Get sports by centre ID
const getSportsByCentre = async (req, res) => {
    const { centreId } = req.query;
    console.log(centreId);
    

    if (!centreId) {
        return res.status(400).json({ success: false, message: "Centre ID is required" });
    }

    try {
        const sports = await Sport.find({ centre: centreId });
        res.json({ success: true, sports });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { getSportsByCentre };
