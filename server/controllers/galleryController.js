const Image = require("../models/Image");

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get images by category
const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category }).sort({ _id: -1 });
    
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found for this category" });
    }

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Upload an image
const uploadImage = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await Image.create({ name, category, url: imageUrl });

    res.status(201).json(image);
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// Delete an image
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// Update an image
const updateImage = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { id } = req.params;

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { name, category },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(updatedImage);
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { getAllImages, getImagesByCategory, uploadImage, deleteImage, updateImage };

module.exports = { getAllImages, getImagesByCategory, uploadImage, deleteImage,updateImage };
