const express = require("express");
const upload = require("../middleware/multerConfig");
const blogController = require("../controllers/blogController");

const router = express.Router();

// Routes
router.post("/", upload.array("images", 5), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.put("/:id",upload.array("images", 5), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/:id", blogController.getBlogById); // Get a single blog by ID
module.exports = router;
