const Estimate = require("../models/Estimate");
const nodemailer = require("nodemailer");
// Create Estimate
const createEstimate = async (req, res) => {
  try {
    console.log("Entered:", req.body); // Debugging request data

    // Parse `services` if it's a JSON string
    if (typeof req.body.services === "string") {
      req.body.services = JSON.parse(req.body.services);
    }

    // Handle images
    const images = req.files?.map(file => file.path) || [];

    // Create new estimate
    const newEstimate = new Estimate({
      ...req.body,
      images,
    });

    await newEstimate.save();
 console.log(newEstimate)


    // ✅ **Send email notification**
    await sendEstimateEmail(newEstimate);

    res.status(201).json({ success: true, estimate: newEstimate });

  } catch (error) {
    console.error("Error creating estimate:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ **Function to send email using Nodemailer**
const sendEstimateEmail = async (estimate) => {
  try {
    // Configure transporter (Use your SMTP credentials)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    // Format email message
    const mailOptions = {
      from: '"Repair My Concrete" <rmc@gmail.com>',
      to: estimate.email,
      subject: "Your Estimate Request Has Been Received - Repair My Concrete",
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
            .logo {
              max-width: 150px;
              margin-bottom: 10px;
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
              background-color: #f1f1f1;
            }
            .estimate-details {
              background-color: white;
              border-left: 4px solid #4a7c94;
              padding: 15px;
              margin: 15px 0;
            }
            .next-steps {
              background-color: #e9f5fb;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .button {
              background-color: #4a7c94;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin: 15px 0;
            }
            .social-links {
              margin-top: 15px;
            }
            .social-links a {
              margin: 0 10px;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <!-- Replace with your actual logo URL -->
          
            <h1>Estimate Request Received</h1>
          </div>
          
          <div class="content">
            <p>Dear ${estimate.firstName},</p>
            
            <p>Thank you for requesting an estimate from Repair My Concrete. We've received your request and are excited to help with your concrete project.</p>
            
            <div class="estimate-details">
              <h3>Your Request Details:</h3>
              <p><strong>Name:</strong> ${estimate.firstName} ${estimate.lastName}</p>
              <p><strong>Email:</strong> ${estimate.email}</p>
              <p><strong>Phone:</strong> ${estimate.phone}</p>
              <p><strong>Services Requested:</strong> ${Object.keys(estimate.services).join(", ") || "N/A"}</p>
              <p><strong>Project Description:</strong> ${estimate.details}</p>
              <p><strong>Submitted On:</strong> ${new Date(estimate.createdAt).toLocaleString()}</p>
            </div>
            
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <p>1. <strong>Review:</strong> Our team will review your request within 24 hours.</p>
              <p>2. <strong>Contact:</strong> We'll reach out to schedule a convenient time to assess your project.</p>
              <p>3. <strong>Estimate:</strong> After assessment, we'll provide you with a detailed, no-obligation estimate.</p>
            </div>
            
            <p>If you have any questions or need to provide additional information, please don't hesitate to contact us:</p>
            <p>📱 720-555-1234<br>
            📧 info@repairmyconcrete.com</p>
            
          
            
            <p>We look forward to working with you!</p>
            
            <p>Best regards,<br>
            The Repair My Concrete Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Repair My Concrete | All Rights Reserved</p>
            <p>123 Construction Ave, Building City, ST 12345</p>
            <div class="social-links">
              <a href="https://facebook.com/">Facebook</a> |
              <a href="https://instagram.com/">Instagram</a> |
              <a href="https://twitter.com/">Twitter</a>
            </div>
            <p><small>If you did not request this estimate, please disregard this email.</small></p>
          </div>
        </body>
        </html>
      `
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Estimate email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
  
  
  
// Update Estimate Status
const updateEstimateStatus = async (req, res) => {
  try {
    const updatedEstimate = await Estimate.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ success: true, estimate: updatedEstimate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Estimates
const getAllEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find().sort({_id:-1});
    res.status(200).json({ success: true, estimates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export functions
module.exports = { createEstimate, updateEstimateStatus, getAllEstimates };
