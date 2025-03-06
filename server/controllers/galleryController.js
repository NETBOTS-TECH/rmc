const Image = require("../models/Image");

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({_id:-1});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Upload an image
const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
  
      // Save file path instead of Base64
      const imageUrl = `/uploads/${req.file.filename}`;
      const image = await Image.create({ url: imageUrl });
  
      res.status(201).json(image);
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  };
  

// Delete an image
const deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllImages, uploadImage, deleteImage };
