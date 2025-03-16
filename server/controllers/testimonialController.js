const Testimonial = require("../models/Testimonial");

// ✅ Create Testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, location, rating, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !location || !rating || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTestimonial = new Testimonial({ name, image, location, rating, description });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a Single Testimonial
exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not Found" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { name, location, rating, description } = req.body;
    let updateData = { name, location, rating, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedTestimonial) return res.status(404).json({ error: "Not Found" });
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
