const express = require("express");
const upload = require("../middleware/multerConfig"); // Import Multer middleware
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById
} = require("../controllers/serviceController");

const router = express.Router();

// ✅ Create a new service (with image upload)
router.post("/", upload.single("image"), createService);

// ✅ Get all services
router.get("/", getAllServices);

// ✅ Get a specific service by ID (should be placed before update/delete)
router.get("/:id", getServiceById);

// ✅ Update a service (with optional image upload)
router.put("/:id", upload.single("image"), updateService); // Changed to PATCH

// ✅ Delete a service
router.delete("/:id", deleteService);

module.exports = router;
