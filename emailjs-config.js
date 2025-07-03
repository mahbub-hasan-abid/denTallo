// EmailJS Configuration for denTallo Dental Clinic
// This file contains the EmailJS service configuration for SMTP email sending

// EmailJS Service Configuration
const emailjsConfig = {
    // Service ID for SMTP
    serviceId: 'service_5r2d5ba',
    
    // Template ID for verification emails
    templateId: 'template_h7l0b32',
    
    // Public Key (you'll need to get this from EmailJS dashboard)
    publicKey: 'aS9G6OHGIHDos5XkH',
    
    // SMTP Configuration (configured in EmailJS dashboard)
    smtpConfig: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'iamfahimfaisal39@gmail.com',
            pass: 'lhvm qbfg zuwi rsop'
        }
    }
};

// EmailJS Template Configuration
const emailTemplates = {
    verification: {
        id: 'template_verification',
        subject: 'Email Verification - denTallo Dental Clinic',
        html: `
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
        `
    }
};

// Initialize EmailJS with configuration
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailjsConfig.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS not loaded');
    }
}

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { emailjsConfig, emailTemplates, initializeEmailJS };
} 