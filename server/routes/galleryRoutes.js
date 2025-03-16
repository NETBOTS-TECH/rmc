const express = require("express");
const upload = require("../middleware/multerConfig"); // Correctly configured Multer instance
const { 
  getAllImages, 
  getImagesByCategory, 
  uploadImage, 
  deleteImage, 
  updateImage // Import the update controller
} = require("../controllers/galleryController");

const router = express.Router();

// Get all images
router.get("/", getAllImages);

// Get images by category
router.get("/category/:category", getImagesByCategory); 

// Upload an image
router.post("/", upload.single("image"), uploadImage);

// Update an image
router.put("/:id", updateImage);

// Delete an image
router.delete("/:id", deleteImage);

module.exports = router;
