# 📧 Email Verification Backend Setup Guide

## 🚨 Quick Fix for 404 Error

The error you're getting is because the backend endpoints don't exist yet. Follow these steps to fix it:

---

## 📋 Setup Steps

### **Step 1: Install Required Package**

In your **backend server directory**, run:

```bash
npm install nodemailer
```

### **Step 2: Setup Gmail App Password**

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords** section
5. Generate a new app password for "Mail"
6. Copy the 16-character password (you'll need this)

### **Step 3: Add Routes to Your Backend**

#### Option A: If you have a `userRoutes.js` file

Add the code from `BACKEND_EMAIL_VERIFICATION.js` to your existing user routes file.

#### Option B: Create new route file

1. Create new file: `backend/routes/emailVerificationRoutes.js`
2. Copy content from `BACKEND_EMAIL_VERIFICATION.js`
3. Update email credentials (lines 13-16)

### **Step 4: Update Your Server Configuration**

In your main server file (usually `server.js` or `app.js`), add:

```javascript
// Import the email verification routes
const emailVerificationRoutes = require("./routes/emailVerificationRoutes");

// OR if you added to userRoutes.js, just make sure it's imported
const userRoutes = require("./routes/userRoutes");

// Use the routes
app.use("/api/user", emailVerificationRoutes);
// OR
app.use("/api/user", userRoutes);
```

### **Step 5: Configure Email Credentials**

Edit the `BACKEND_EMAIL_VERIFICATION.js` file and update:

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com", // ← Your Gmail address
    pass: "YOUR_APP_PASSWORD", // ← Your 16-char app password
  },
});
```

Also update in the mailOptions:

```javascript
from: 'YOUR_EMAIL@gmail.com',  // ← Same email
```

---

## 🔧 Alternative: Quick Test Without Email

If you want to test the feature without setting up email, you can use console logging:

```javascript
router.post("/send-email-verification", async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    verificationCodes.set(email, {
      code: code,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

    // FOR TESTING: Print code to console
    console.log("==================================");
    console.log(`VERIFICATION CODE FOR ${email}: ${code}`);
    console.log("==================================");

    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
      // FOR TESTING ONLY: Include code in response
      testCode: code,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send verification code" });
  }
});
```

Then you can see the code in your backend console and use it to test!

---

## 📁 File Structure

Your backend should look like this:

```
backend/
├── server.js (or app.js)
├── routes/
│   ├── userRoutes.js
│   └── emailVerificationRoutes.js  ← New file
├── package.json
└── node_modules/
```

---

## ✅ Testing the Endpoints

### Test 1: Send Verification Code

```bash
POST http://localhost:3000/api/user/send-email-verification
Content-Type: application/json

{
  "email": "test@example.com"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Verification code sent successfully"
}
```

### Test 2: Verify Code

```bash
POST http://localhost:3000/api/user/verify-email-code
Content-Type: application/json

{
  "email": "test@example.com",
  "code": "123456"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## 🔐 Security Features Included

✅ Code expires after 10 minutes
✅ Maximum 5 attempts per code (prevents brute force)
✅ Automatic cleanup of expired codes
✅ Email format validation
✅ Rate limiting ready

---

## 🌐 Using Other Email Services

### **SendGrid**

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

const msg = {
  to: email,
  from: "your-email@example.com",
  subject: "Verification Code",
  html: `Your code is: ${code}`,
};

await sgMail.send(msg);
```

### **AWS SES**

```javascript
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "us-east-1" });

const params = {
  Source: "your-email@example.com",
  Destination: { ToAddresses: [email] },
  Message: {
    Subject: { Data: "Verification Code" },
    Body: { Html: { Data: `Your code is: ${code}` } },
  },
};

await ses.sendEmail(params).promise();
```

---

## 🐛 Troubleshooting

### **Error: "Invalid login: 535-5.7.8 Username and Password not accepted"**

**Solution:** Use an App Password, not your regular Gmail password

1. Enable 2-Step Verification in Google Account
2. Generate App Password
3. Use the 16-character password in your code

### **Error: "connect ETIMEDOUT"**

**Solution:** Check your network/firewall settings

- Allow outbound connections on port 587 (or 465)
- Try different Gmail SMTP ports

### **Error: "self signed certificate"**

**Solution:** Add to transporter config:

```javascript
tls: {
  rejectUnauthorized: false;
}
```

---

## 📞 Need Help?

Common issues and solutions:

1. **404 Error** → Backend route not set up correctly
2. **500 Email Error** → Check email credentials
3. **Code not received** → Check spam folder or use console logging for testing
4. **Code expired** → Codes expire after 10 minutes

---

## 🎉 Once Setup is Complete

1. Restart your backend server
2. Go to Profile page in your frontend
3. Click "Edit" next to email
4. Enter new email
5. Click "Send Verification Code"
6. Check your email (or console for test mode)
7. Enter the 6-digit code
8. Click "Verify & Save"
9. Email updated! ✨

---

## 📝 Production Recommendations

For production deployment:

1. **Use Redis** instead of Map for storing codes
2. **Add rate limiting** to prevent spam
3. **Use environment variables** for email credentials
4. **Enable logging** for security audits
5. **Use a professional email service** (SendGrid, AWS SES)
6. **Add CAPTCHA** to prevent bots

Example with Redis:

```javascript
const redis = require("redis");
const client = redis.createClient();

// Store code
await client.setex(`verify:${email}`, 600, code); // 600 seconds = 10 minutes

// Verify code
const storedCode = await client.get(`verify:${email}`);
```

---

## 🎯 Quick Start Checklist

- [ ] Install nodemailer (`npm install nodemailer`)
- [ ] Get Gmail App Password
- [ ] Copy code from `BACKEND_EMAIL_VERIFICATION.js`
- [ ] Update email credentials
- [ ] Add routes to server
- [ ] Restart backend server
- [ ] Test with Postman or similar
- [ ] Test from frontend

---

**Note:** The frontend is already complete and ready to use. Just set up the backend endpoints and everything will work! 🚀
