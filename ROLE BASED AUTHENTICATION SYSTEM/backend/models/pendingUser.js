const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  otpHash: String,
  otpExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('PendingUser', pendingUserSchema);
