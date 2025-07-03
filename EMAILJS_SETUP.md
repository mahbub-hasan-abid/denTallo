# EmailJS Setup Guide for denTallo Dental Clinic

This guide will help you set up EmailJS to send verification emails using your Gmail SMTP credentials.

## Step 1: Sign up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Configure Email Service

1. Log in to your EmailJS dashboard
2. Go to "Email Services" in the left sidebar
3. Click "Add New Service"
4. Choose "Gmail" as the service provider
5. Enter the following details:
   - **Service Name**: `service_5r2d5ba`
   - **Email**: `iamfahimfaisal39@gmail.com`
   - **Password**: `lhvm qbfg zuwi rsop` (your app password)
6. Click "Create Service"

## Step 3: Create Email Template

1. Go to "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Enter the following details:
   - **Template Name**: `template_verification`
   - **Subject**: `Email Verification - denTallo Dental Clinic`
4. Use this HTML template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Email Verification</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .verification-code { background: #007bff; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 10px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🦷 denTallo Dental Clinic</h1>
            <p>Email Verification</p>
        </div>
        <div class="content">
            <h2>Hello {{to_name}},</h2>
            <p>Thank you for registering with <strong>denTallo Dental Clinic</strong>!</p>
            <p>To complete your registration, please use the verification code below:</p>
            
            <div class="verification-code">
                {{verification_code}}
            </div>
            
            <p><strong>Important:</strong></p>
            <ul>
                <li>This code will expire in 10 minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this code, please ignore this email</li>
            </ul>
            
            <p>If you have any questions, please contact us at <strong>info@dentallo.com.bd</strong></p>
            
            <p>Best regards,<br>
            <strong>denTallo Dental Clinic Team</strong></p>
        </div>
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; 2024 denTallo Dental Clinic. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

5. Click "Save Template"

## Step 4: Get Your Public Key

1. Go to "Account" in the left sidebar
2. Click "API Keys"
3. Copy your "Public Key"

## Step 5: Update the Code

1. Open `login.html`
2. Find this line:
   ```javascript
   emailjs.init("aS9G6OHGIHDos5XkH");
   ```
3. Replace `aS9G6OHGIHDos5XkH` with your actual public key from Step 4

## Step 6: Test the Email Verification

1. Open `login.html` in your browser
2. Try to register a new account
3. You should receive a verification email
4. Enter the verification code to complete registration

## Important Notes

- The free EmailJS plan allows 200 emails per month
- Make sure your Gmail app password is correct
- The verification code expires after 10 minutes
- Users can resend the verification code after 60 seconds

## Troubleshooting

If emails are not being sent:

1. Check your EmailJS dashboard for any error messages
2. Verify your Gmail app password is correct
3. Make sure your EmailJS service is properly configured
4. Check the browser console for any JavaScript errors

## Security Notes

- Never commit your EmailJS public key to public repositories
- Consider using environment variables for production
- The Gmail app password should be kept secure
- Monitor your EmailJS usage to avoid exceeding limits 

## Example: Correct Usage

```js
emailjs.init("aS9G6OHGIHDos5XkH"); // from EmailJS dashboard

const templateParams = {
  to_email: "test@example.com",
  to_name: "Test User",
  verification_code: "123456"
};

emailjs.send('service_5r2d5ba', 'template_h7l0b32', templateParams)
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
  }, (err) => {
    console.log('FAILED...', err);
  });
``` 