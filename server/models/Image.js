const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Image", imageSchema);
