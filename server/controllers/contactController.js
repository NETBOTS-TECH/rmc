const Contact = require("../models/contactModel");

// Create a new contact
const createContact = async (req, res) => {
    console.log(req.body)
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact, updateContactStatus, getAllContacts };
