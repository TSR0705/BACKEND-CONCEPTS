const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,        // Your Gmail address
    pass: process.env.EMAIL_PASS         // App password or Gmail pass (if not 2FA)
  }
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP for Account Verification',
    html: `<p>Your verification OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
