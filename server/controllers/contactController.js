const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
// Create a new contact
const createContact = async (req, res) => {
  console.log("Received Contact Data:", req.body); // Debugging request data

  try {
    // Save contact in database
    const contact = new Contact(req.body);
    await contact.save();

    // Send email notification
    await sendContactEmail(contact);
console.log(contact)
    res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// 📨 Function to Send Email
const sendContactEmail = async (contact) => {
  try {
    // Configure email transporter (SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email message content
    const mailOptions = {
      from: '"Repair My Concrete" <rmc@gmail.com>',
      to: contact.email,
      subject: "Thank You for Contacting Repair My Concrete",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #4a7c94;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
            }
            .footer {
              font-size: 12px;
              text-align: center;
              padding: 10px;
              color: #666666;
            }
            .contact-details {
              background-color: white;
              border-left: 4px solid #4a7c94;
              padding: 15px;
              margin-top: 15px;
            }
            .button {
              background-color: #4a7c94;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Contacting Us</h1>
          </div>
          <div class="content">
            <p>Dear ${contact.name},</p>
            <p>Thank you for reaching out to Repair My Concrete. We have received your inquiry and will get back to you as soon as possible, typically within 24 hours.</p>
            
            <p>Here's a summary of the information you provided:</p>
            <div class="contact-details">
              <p><strong>Name:</strong> ${contact.name}</p>
              <p><strong>Email:</strong> ${contact.email}</p>
              <p><strong>Phone:</strong> ${contact.phone}</p>
              <p><strong>Message:</strong> ${contact.message}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>If you need immediate assistance, please don't hesitate to call us at 720-555-1234.</p>
            
            <p>We look forward to helping you with your concrete repair needs.</p>
            
          
            
            <p>Best regards,</p>
            <p>The Repair My Concrete Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Repair My Concrete. All rights reserved.</p>
            <p>123 Construction Ave, Building City, ST 12345</p>
          
          </div>
        </body>
        </html>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Contact form email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
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
    const contacts = await Contact.find().sort({_id:-1});
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact, updateContactStatus, getAllContacts };
