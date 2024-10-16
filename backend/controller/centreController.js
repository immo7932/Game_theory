// backend/controller/centre.controller.js

import Centre from "../model/centreModel.js"

// Get all centres
const getCentres = async (req, res) => {
    try {
        const centres = await Centre.find();
        res.json({ success: true, centres });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { getCentres };
