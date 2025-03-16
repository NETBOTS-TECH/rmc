const express = require("express");
const upload = require("../middleware/multerConfig");
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

router.post("/", upload.single("image"), createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonial);
router.put("/:id", upload.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
