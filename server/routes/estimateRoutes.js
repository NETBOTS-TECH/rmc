const express = require("express");
const { createEstimate, updateEstimateStatus, getAllEstimates } = require("../controllers/estimateController.js");
const upload = require("../middleware/multerConfig.js");

const router = express.Router();

router.post("/", upload.array("images", 5), createEstimate);
router.put("/:id/status", updateEstimateStatus);
router.get("/", getAllEstimates);

module.exports = router;
