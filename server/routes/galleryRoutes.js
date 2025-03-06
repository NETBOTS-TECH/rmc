const express = require("express");
const upload = require("../middleware/multerConfig"); // Import correctly configured Multer instance
const { getAllImages, uploadImage, deleteImage } = require("../controllers/galleryController");


const router = express.Router();

router.get("/",  getAllImages);
router.post("/",  upload.single("image"), uploadImage);
router.delete("/:id",  deleteImage); // Added authMiddleware for security

module.exports = router;
