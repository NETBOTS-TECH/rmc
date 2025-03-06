const express = require("express");
const router = express.Router();
const { createContact, updateContactStatus, getAllContacts } = require("../controllers/contactController");

router.post("/", createContact);
router.put("/:id/status", updateContactStatus);
router.get("/", getAllContacts);

module.exports = router;
