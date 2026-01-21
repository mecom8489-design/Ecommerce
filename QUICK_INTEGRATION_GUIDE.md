# 🚀 Quick Integration Guide - Email Verification with Resend

## ✅ Good News!

You're already using **Resend** in your backend, so this will be super easy to implement!

---

## 📝 Step-by-Step Integration

### **Step 1: Update Your User Routes File**

In your backend user routes file (where you have the contact form code), add this at the top:

```javascript
// Temporary storage for verification codes
const verificationCodes = new Map();
```

### **Step 2: Replace Your Test Routes**

Replace this code:

```javascript
router.post("/sendemailverification", (req, res) => {
  // ... your test code
});

router.post("/verify-email-code", (req, res) => {
  // ... your test code
});
```

With the code from: **`BACKEND_EMAIL_VERIFICATION_RESEND.js`**

Copy the two route handlers:

- `router.post('/send-email-verification', async (req, res) => { ... })`
- `router.post('/verify-email-code', async (req, res) => { ... })`

### **Step 3: Fix the Route Name**

⚠️ **Important:** Your current route is `/sendemailverification` but the frontend expects `/send-email-verification` (with dashes).

**Change:**

```javascript
router.post('/sendemailverification', ...)
```

**To:**

```javascript
router.post('/send-email-verification', ...)
```

---

## 🔧 Complete Code for Your Backend

Here's exactly what to add to your user routes file:

```javascript
const contactusModel = require("../../models/userModel/contactusModel");
const { Resend } = require("resend");
const resend = new Resend("re_7FuDobS5_25UEar3f1uuxQ8nX89CKnCQC");

// ✅ ADD THIS: Storage for verification codes
const verificationCodes = new Map();

// Your existing contact form code...
exports.createContactus = async (req, res) => {
  // ... your existing code
};

// ✅ ADD THESE TWO ROUTES:

// Send verification code
router.post("/send-email-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Generate code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store code
    verificationCodes.set(email, {
      code: code,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

    // Send email using Resend
    await resend.emails.send({
      from: "Your Website <onboarding@resend.dev>",
      to: email,
      subject: "Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">🔐 Email Verification</h1>
          
          <p style="color: #666; font-size: 16px;">Hello,</p>
          <p style="color: #666; font-size: 16px;">You requested to update your email address. Use this code:</p>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <div style="font-size: 42px; font-weight: bold; color: white; 
                        letter-spacing: 8px; font-family: Courier New, monospace;">
              ${code}
            </div>
          </div>
          
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; 
                      padding: 15px; margin: 20px 0; border-radius: 4px;">
            <strong>⏰ Important:</strong> This code expires in <strong>10 minutes</strong>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    });

    console.log("═══════════════════════════════════");
    console.log(`✉️  EMAIL: ${email}`);
    console.log(`🔑 CODE: ${code}`);
    console.log("═══════════════════════════════════");

    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
      error: error.message,
    });
  }
});

// Verify code
router.post("/verify-email-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No verification code found. Please request a new code.",
      });
    }

    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Code expired. Please request a new code.",
      });
    }

    storedData.attempts += 1;

    if (storedData.attempts > 5) {
      verificationCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new code.",
      });
    }

    if (storedData.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    verificationCodes.delete(email);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify code",
      error: error.message,
    });
  }
});
```

---

## ✅ Checklist

- [ ] Add `const verificationCodes = new Map();` at top of file
- [ ] Copy the two route handlers
- [ ] Make sure route is `/send-email-verification` (with dashes)
- [ ] Save the file
- [ ] Restart your backend server
- [ ] Test from frontend!

---

## 🧪 Testing

1. **Go to Profile page** in your app
2. **Click "Edit"** next to email
3. **Enter new email** (use a real email you can access)
4. **Click "Send Verification Code"**
5. **Check your email** for the code
6. **Enter the 6-digit code**
7. **Click "Verify & Save"**

---

## 🐛 If Emails Don't Arrive

1. **Check spam/junk folder**
2. **Check backend console** - the code is also logged there
3. **Verify Resend API key** is active
4. **Check Resend dashboard** for email logs

---

## 💡 Pro Tips

### Customize the Email

Change the "from" address:

```javascript
from: "Your Company Name <onboarding@resend.dev>";
```

### Use Your Own Domain (Optional)

If you have Resend set up with your domain:

```javascript
from: "Your Company <noreply@yourdomain.com>";
```

### Change Code Expiry Time

```javascript
expiresAt: Date.now() + 5 * 60 * 1000; // 5 minutes
```

---

## 🎉 That's It!

Your email verification is ready to use with Resend! The frontend is already complete, so once you add these routes and restart your backend, everything will work perfectly! 🚀

---

## 📞 Quick Troubleshooting

| Issue              | Solution                                               |
| ------------------ | ------------------------------------------------------ |
| 404 Error          | Check route name has dashes `/send-email-verification` |
| Email not received | Check spam, or use code from console                   |
| Code expired       | Codes expire in 10 minutes, request new one            |
| Invalid code       | Make sure you're entering all 6 digits                 |

The code is also printed to your backend console for easy testing! 👍
