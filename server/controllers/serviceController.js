const Service = require("../models/Service");

// Base URL for serving images
const BASE_URL = process.env.SERVER_URL; // Change this if hosted elsewhere

// Create Service
exports.createService = async (req, res) => {
  const { name,subheading, description, category } = req.body;
  const image = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null; // Save image URL
console.log(image)
  try {
    const service = new Service({ name,subheading ,description, image, category });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creating service" });
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({_id:-1});
    console.log("Services are :", services)
    res.json(services);
  } catch (error) {
    console.log("service error ",error)
    res.status(500).json({ message: "Error fetching services" });
  }
};
exports.getServiceById = async (req, res) => {
  try {
    console.log("entered")
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }  

    // Fetch related services in the same category, excluding the current service
    const relatedServices = await Service.find({
      category: service.category,
      _id: { $ne: id }, // Exclude current service
    });

    res.json({ service, relatedServices });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Error fetching service" });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, subheading } = req.body;
  const image = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : undefined;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, category,subheading, ...(image && { image }) },
      { new: true }
    );
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: "Error updating service" });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service" });
  }
};
// Get Service by ID and Fetch Related Services
