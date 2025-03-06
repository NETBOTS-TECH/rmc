const mongoose = require("mongoose");

const chatUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("ChatUser", chatUserSchema);
