const Estimate = require("../models/Estimate");

// Create Estimate
const createEstimate = async (req, res) => {
    try {
      console.log("Entered:", req.body); // Debugging request data
  
      // Parse `services` if it's a JSON string
      if (typeof req.body.services === "string") {
        req.body.services = JSON.parse(req.body.services);
      }
  
      // Handle images
      const images = req.files?.map(file => file.path) || [];
  
      // Create new estimate
      const newEstimate = new Estimate({
        ...req.body,
        images,
      });
  
      await newEstimate.save();
      res.status(201).json({ success: true, estimate: newEstimate });
  
    } catch (error) {
      console.error("Error creating estimate:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
  
// Update Estimate Status
const updateEstimateStatus = async (req, res) => {
  try {
    const updatedEstimate = await Estimate.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ success: true, estimate: updatedEstimate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Estimates
const getAllEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find();
    res.status(200).json({ success: true, estimates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export functions
module.exports = { createEstimate, updateEstimateStatus, getAllEstimates };
