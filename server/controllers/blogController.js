const Blog = require("../models/Blog");
const path = require("path");

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
      const { title, sections } = req.body;
      const sectionData = typeof sections === "string" ? JSON.parse(sections) : sections;
      console.log("Received Sections:", sectionData);
      console.log("Received Files:", req.files);
  
      let fileIndex = 0; // Ensure correct mapping of files
  
      sectionData.forEach((section, index) => {
        if (section.image && typeof section.image === "string" && section.image.startsWith("NEW_IMAGE_") && req.files[fileIndex]) {
          // Assign new image to the correct section
          section.image = `${process.env.SERVER_URL}/uploads/${req.files[fileIndex].filename}`;
          fileIndex++; // Move to next file
        }
      });
  
      const newBlog = new Blog({ title, sections: sectionData });
      await newBlog.save();
  
      res.status(201).json({ success: true, blog: newBlog });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
  
  
  
  

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try {
        console.log("Update request received:", req.body);
        
        const { title, sections } = req.body;
        const sectionData = typeof sections === "string" ? JSON.parse(sections) : sections;
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        let fileIndex = 0;

        // Map of images assigned to correct sections
        const updatedSections = sectionData.map((section, index) => {
            let newImage = section.image;

            // If the image is a placeholder (NEW_IMAGE_X), replace it with an uploaded file
            if (typeof section.image === "string" && section.image.startsWith("NEW_IMAGE_")) {
                if (req.files && req.files[fileIndex]) {
                    newImage = `${process.env.SERVER_URL}/uploads/${req.files[fileIndex].filename}`;
                    fileIndex++; // Increment only when an image is taken
                } else {
                    newImage = null; // Ensure null if no file exists
                }
            }

            return {
                heading: section.heading || blog.sections[index]?.heading || "",
                paragraph: section.paragraph || blog.sections[index]?.paragraph || "",
                image: newImage || blog.sections[index]?.image || null, // Preserve existing image if no change
            };
        });

        // Update blog
        blog.title = title || blog.title;
        blog.sections = updatedSections;
        await blog.save();

        res.json({ success: true, blog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// GET BLOG BY ID
exports.getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      res.json({ success: true, blog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
