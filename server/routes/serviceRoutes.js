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
const allowedOrigins = [
  "https://repairmyconcrete.com",
  "http://localhost:3000",  // For local development
  "http://82.29.179.48:3000"
];

router.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // Set specific origin
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
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
