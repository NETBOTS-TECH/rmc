const ChatUser = require("../models/ChatUser"); // Create a ChatUser model if not already
const nodemailer = require("nodemailer");
// @desc Create a chat user
// @route POST /api/chat-users


const createChatUser = async (req, res) => {
  console.log("Entered createChatUser API");

  try {
    const { name, email, phone, issue } = req.body; // 'issue' instead of 'description'

    if (!name || !email || !phone || !issue) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save chat user in the database
    const chatUser = await ChatUser.create({ name, email, phone, description: issue });

    // Send email notification
    await sendChatUserEmail(chatUser);

    res.status(201).json({ success: true, chatUser });
  } catch (error) {
    console.error("Error creating chat user:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 📨 Function to Send Email
const sendChatUserEmail = async (chatUser) => {
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
      to: chatUser.email,
      subject: "We've Received Your Chat Request - Repiar My Concrete",
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
              background-color: #3b5998;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .logo {
              max-width: 150px;
              margin-bottom: 10px;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
            }
            .request-details {
              background-color: white;
              border-left: 4px solid #3b5998;
              padding: 15px;
              margin: 15px 0;
            }
            .support-info {
              background-color: #edf2fa;
              padding: 15px;
              border-radius: 5px;
              margin-top: 15px;
            }
            .button {
              background-color: #3b5998;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin-top: 15px;
              text-align: center;
            }
            .footer {
              font-size: 12px;
              text-align: center;
              padding: 15px;
              color: #666666;
              background-color: #f1f1f1;
            }
            .social-links {
              margin: 10px 0;
            }
            .social-links a {
              margin: 0 10px;
              text-decoration: none;
              color: #3b5998;
            }
            .divider {
              border-top: 1px solid #dddddd;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <!-- Replace with your actual logo URL -->
          
            <h1>We've Received Your Chat Request</h1>
          </div>
          
          <div class="content">
            <p>Hello ${chatUser.name},</p>
            
            <p>Thank you for reaching out to Repair My Concrete! We've received your chat request and appreciate you taking the time to contact us about your concrete concerns.</p>
            
            <div class="request-details">
              <h3>Your Request Information:</h3>
              <p><strong>Name:</strong> ${chatUser.name}</p>
              <p><strong>Email:</strong> ${chatUser.email}</p>
              <p><strong>Phone:</strong> ${chatUser.phone}</p>
              <p><strong>Issue Description:</strong> ${chatUser.description}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="support-info">
              <h3>What Happens Next</h3>
              <p>Our concrete specialists are reviewing your request and will contact you shortly. Typically, you can expect to hear from us within:</p>
              <ul>
                <li><strong>Phone:</strong> Within 2 business hours</li>
                <li><strong>Email:</strong> Within 4 business hours</li>
              </ul>
              <p>For urgent matters, please call our support line at <strong>720-555-1234</strong>.</p>
            </div>
            
            <div class="divider"></div>
            
            <p>We look forward to helping you with your concrete lifting needs!</p>
            
            <p>Best regards,<br>
            The Repair My Concrete Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Repair My Concrete | All Rights Reserved</p>
            <p>123 Construction Ave, Building City, ST 12345</p>
            <div class="social-links">
              <a href="https://facebook.com">Facebook</a> |
              <a href="https://instagram.com">Instagram</a> |
              <a href="https://www.linkedin.com/">LinkedIn</a>
            </div>
            <p><small>If you did not submit this request, please contact us immediately.</small></p>
          </div>
        </body>
        </html>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Chat user email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



// @desc Get all chat users
// @route GET /api/chat-users
const getChatUsers = async (req, res) => {
    try {
      const chatUsers = await ChatUser.find().sort({ _id: -1 }); // Sort by newest first
      res.json(chatUsers);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  

module.exports = {
  createChatUser,
  getChatUsers,
};
