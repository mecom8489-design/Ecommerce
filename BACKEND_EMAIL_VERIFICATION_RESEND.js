/**
 * Email Verification Routes - Using Resend
 * Add this to your backend user routes file
 */

// At the top of your routes file, add:
// const { Resend } = require('resend');
// const resend = new Resend("re_7FuDobS5_25UEar3f1uuxQ8nX89CKnCQC");

// Temporary storage for verification codes
const verificationCodes = new Map();

/**
 * POST /api/user/send-email-verification
 * Send verification code to email using Resend
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

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Your Website <onboarding@resend.dev>",
      to: email,
      subject: "Email Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              background-color: #f6f9fc;
              padding: 20px;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 12px;
              padding: 40px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              color: #1a1a1a;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .code-box {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .code {
              font-size: 42px;
              font-weight: bold;
              color: white;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .message {
              color: #4a5568;
              line-height: 1.6;
              font-size: 16px;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              color: #718096;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Email Verification</h1>
            </div>
            
            <p class="message">Hello,</p>
            <p class="message">You requested to update your email address. Please use the verification code below to complete the process:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This code will expire in <strong>10 minutes</strong>.
            </div>
            
            <p class="message">Enter this code in the verification field to confirm your new email address.</p>
            
            <p class="message">If you didn't request this verification code, please ignore this email or contact support if you're concerned about your account security.</p>
            
            <div class="footer">
              <p>This is an automated email, please do not reply.</p>
              <p style="margin-top: 10px;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Log for development
    console.log("═══════════════════════════════════");
    console.log(`✉️  EMAIL: ${email}`);
    console.log(`🔑 CODE: ${code}`);
    console.log(`📧 EMAIL ID: ${emailResponse.id}`);
    console.log("═══════════════════════════════════");

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

    console.log(`✅ Email verified successfully: ${email}`);

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
    let cleanedCount = 0;

    for (const [email, data] of verificationCodes.entries()) {
      if (now > data.expiresAt) {
        verificationCodes.delete(email);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired verification code(s)`);
    }
  },
  15 * 60 * 1000,
);

// Export if using module.exports
// module.exports = router;
