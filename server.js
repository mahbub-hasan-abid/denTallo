const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration (you'll need to update these with your actual credentials)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'iamfahimfaisal39@gmail.com', // Replace with your Gmail
        pass: 'lhvm qbfg zuwi rsop'     // Replace with your Gmail App Password
    }
});

// Temporary storage for OTPs
const otpStore = {};

// OTP Email endpoint
app.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in memory with a timestamp
        otpStore[email] = { otp, timestamp: Date.now() };

        const mailOptions = {
            from: {
                name: 'denTallo Dental Clinic',
                address: 'your-email@gmail.com' // Replace with your Gmail
            },
            to: email,
            subject: 'Your OTP Code - denTallo Dental Clinic',
            html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #007bff;text-decoration:none;font-weight:600">
                <span style="margin-right: 8px;">🦷</span>denTallo Dental Clinic
              </a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing denTallo Dental Clinic. Use the following OTP to verify your email address. OTP is valid for 5 minutes</p>
            <h2 style="background: #007bff;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">
              If you didn't request this OTP, please ignore this email.<br/>
              Regards,<br />
              denTallo Dental Team
            </p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>denTallo Dental Clinic</p>
              <p>House 12, Road 5, Dhanmondi</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('OTP Email sent:', info.messageId);
        console.log('OTP generated:', otp);
        console.log('email:', email) // In production, don't log the OTP

        res.json({
            success: true,
            message: 'OTP sent successfully!',
            otp: otp // Return OTP for frontend redirect
        });

    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP email. Please try again.'
        });
    }
});

// Include OTP in response for debugging purposes
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    console.log('Verify OTP request received:', { email, otp });
    console.log('Current OTP store:', otpStore); // Log current OTP store for debugging

    if (!email || !otp) {
        console.log('Missing email or OTP in request');
        return res.status(400).json({
            success: false,
            message: 'Email and OTP are required'
        });
    }

    const storedData = otpStore[email];

    if (!storedData) {
        console.log('No OTP found for email');
        return res.status(400).json({
            success: false,
            message: 'Invalid OTP',
            debugOtp: null // No OTP stored
        });
    }

    const { otp: storedOtp, timestamp } = storedData;

    // Check if OTP matches and is within the validity period (5 minutes)
    if (storedOtp === otp && Date.now() - timestamp <= 5 * 60 * 1000) {
        console.log('OTP matched successfully');
        delete otpStore[email]; // Remove OTP after successful verification
        return res.json({
            success: true,
            message: 'OTP verified successfully!'
        });
    }

    console.log('Invalid or expired OTP provided, storedOtp:', storedOtp);
    res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
        debugOtp: storedOtp // Include the stored OTP for debugging
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Make sure to update email credentials in server.js');
});
