const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  image: String,
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sections: [sectionSchema],
});

module.exports = mongoose.model("Blog", blogSchema);
