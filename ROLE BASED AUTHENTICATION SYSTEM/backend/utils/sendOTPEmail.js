const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP for Account Verification',
    html: `<p>Your verification OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
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
