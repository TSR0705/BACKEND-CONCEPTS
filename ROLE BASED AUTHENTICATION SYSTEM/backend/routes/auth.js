const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const PendingUser = require('../models/pendingUser');
const sendOTPEmail = require('../utils/sendOTPEmail');

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/* ------------------------------------------------
   INITIATE SIGNUP - Send OTP
--------------------------------------------------*/
router.post('/signup-initiate', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    const existingPending = await PendingUser.findOne({ email });

    if (existingUser || existingPending) {
      return res.status(400).json({ message: 'Email already in use or pending verification' });
    }

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    const pendingUser = new PendingUser({ fullName, email, password, role, otpHash, otpExpires });
    await pendingUser.save();

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (err) {
    console.error('Signup Initiation Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ------------------------------------------------
   VERIFY OTP & COMPLETE SIGNUP
--------------------------------------------------*/
router.post('/signup-verify', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const pending = await PendingUser.findOne({ email });

    if (!pending || pending.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const isMatch = await bcrypt.compare(otp, pending.otpHash);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect OTP' });

    // Create verified user
    const hashedPassword = await bcrypt.hash(pending.password, 10);
    const user = new User({
      fullName: pending.fullName,
      email: pending.email,
      password: hashedPassword,
      role: pending.role
    });

    await user.save();
    await PendingUser.deleteOne({ email });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error('Signup Verification Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ------------------------------------------------
   LOGIN - No changes
--------------------------------------------------*/
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.role !== role) {
      return res.status(400).json({ message: 'Incorrect role selected' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


/* ------------------------------------------------
   FORGOT PASSWORD - Send OTP
--------------------------------------------------*/
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No user with this email' });

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otpHash = otpHash;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent to your email for password reset' });

  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ------------------------------------------------
   RESET PASSWORD - Verify OTP and Update Password
--------------------------------------------------*/
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !user.otpHash || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const isMatch = await bcrypt.compare(otp, user.otpHash);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect OTP' });

    user.password = newPassword; // Will be hashed in pre-save
    user.otpHash = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });

  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
