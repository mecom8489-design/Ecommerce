/**
 * Email Verification Backend Implementation
 *
 * Add these routes to your backend server (Node.js/Express)
 * Location: backend/routes/userRoutes.js (or similar)
 */

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Temporary storage for verification codes
// In production, use Redis or database
const verificationCodes = new Map();

// Configure email transporter (Update with your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail", // or 'smtp.gmail.com'
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-app-password", // Replace with your app password
  },
});

/**
 * POST /api/user/send-email-verification
 * Send verification code to email
 */
router.post("/send-email-verification", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store code with expiry time (10 minutes)
    verificationCodes.set(email, {
      code: code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0,
    });

    // Email template
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email
      to: email,
      subject: "Email Verification Code - Your App Name",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              background-color: white;
              border-radius: 10px;
              padding: 30px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #333;
            }
            .code-box {
              background-color: #f8f9fa;
              border: 2px dashed #007bff;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #007bff;
              letter-spacing: 5px;
            }
            .footer {
              text-align: center;
              color: #666;
              font-size: 12px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Email Verification</h1>
            <p>Hello,</p>
            <p>You requested to update your email address. Please use the verification code below to complete the process:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <p><strong>This code will expire in 10 minutes.</strong></p>
            <p>If you didn't request this, please ignore this email.</p>
            
            <div class="footer">
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Verification code sent to ${email}: ${code}`); // For development only

    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
      error: error.message,
    });
  }
});

/**
 * POST /api/user/verify-email-code
 * Verify the email verification code
 */
router.post("/verify-email-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    // Validate input
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    // Get stored verification data
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No verification code found. Please request a new code.",
      });
    }

    // Check if code has expired
    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    // Increment attempt count
    storedData.attempts += 1;

    // Check max attempts (prevent brute force)
    if (storedData.attempts > 5) {
      verificationCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new code.",
      });
    }

    // Verify code
    if (storedData.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. Please try again.",
      });
    }

    // Code is valid - remove from storage
    verificationCodes.delete(email);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify code",
      error: error.message,
    });
  }
});

// Clean up expired codes every 15 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [email, data] of verificationCodes.entries()) {
      if (now > data.expiresAt) {
        verificationCodes.delete(email);
        console.log(`Cleaned up expired code for: ${email}`);
      }
    }
  },
  15 * 60 * 1000,
);

module.exports = router;
