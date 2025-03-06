const mongoose = require("mongoose");

const EstimateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String },
  street1: { type: String, required: true },
  street2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  services: { type: Object, required: true },
  schedulePreference: { type: String, required: true },
  propertyType: { type: String, required: true },
  details: { type: String, required: true },
  images: [{ type: String }], // Store image paths
  status: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Estimate", EstimateSchema);
