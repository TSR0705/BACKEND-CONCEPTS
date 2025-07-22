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
    from: `"Samvidhan Setu Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🔐 Verify Your Identity – OTP Enclosed',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OTP Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #e6ecf0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background: linear-gradient(135deg, #0f62fe, #4781ff); padding: 30px 20px;">
                      <img src="https://yourdomain.com/logo.png" alt="Samvidhan Setu Logo" width="120" style="margin-bottom: 12px;" />
                      <h1 style="color: #fff; margin: 0; font-size: 24px;">Samvidhan Setu</h1>
                      <p style="color: #dbe9ff; font-size: 14px; margin-top: 4px;">Secure Identity Verification</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="font-size: 18px; margin-bottom: 10px; color: #333;">Hello <strong>${username}</strong>,</p>
                      <p style="font-size: 16px; color: #444;">
                        Please use the following One-Time Password (OTP) to verify your identity. This code is valid for the next <strong>10 minutes</strong> and should not be shared with anyone.
                      </p>

                      <!-- OTP Box -->
                      <div style="margin: 40px auto; text-align: center;">
                        <span style="
                          display: inline-block;
                          background: #0f62fe;
                          color: #ffffff;
                          padding: 16px 32px;
                          font-size: 28px;
                          font-weight: 600;
                          border-radius: 10px;
                          letter-spacing: 6px;
                          box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
                        ">
                          ${otp}
                        </span>
                      </div>

                      <p style="font-size: 14px; color: #666;">
                        If you did not request this, please disregard this email or <a href="mailto:support@samvidhansetu.com" style="color: #0f62fe; text-decoration: none;">contact our support team</a> immediately.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #888;">
                      &copy; ${new Date().getFullYear()} Samvidhan Setu. All rights reserved.<br/>
                      <a href="mailto:support@samvidhansetu.com" style="color: #0f62fe; text-decoration: underline;">support@samvidhansetu.com</a>
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
