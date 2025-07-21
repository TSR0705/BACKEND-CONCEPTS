const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (to, otp, username = 'User') => {
  const mailOptions = {
    from: `"YourApp Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🔐 Your OTP for Account Verification',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Your OTP Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 30px 40px; text-align: center; background-color: #0f62fe;">
                      <h1 style="color: #ffffff; margin: 0;">YourApp</h1>
                      <p style="color: #cce0ff; font-size: 14px;">Secure Verification</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px 40px;">
                      <p style="font-size: 16px; color: #333;">Hello <strong>${username}</strong>,</p>
                      <p style="font-size: 16px; color: #333;">
                        Use the following One-Time Password (OTP) to complete your verification:
                      </p>

                      <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0f62fe; text-align: center; margin: 30px 0;">
                        ${otp}
                      </p>

                      <p style="font-size: 14px; color: #777;">
                        This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email or contact support.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px 40px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #888;">
                      &copy; ${new Date().getFullYear()} YourApp. All rights reserved.<br />
                      Need help? <a href="mailto:support@yourapp.com" style="color: #0f62fe; text-decoration: none;">Contact Support</a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error.message);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = sendOTPEmail;
