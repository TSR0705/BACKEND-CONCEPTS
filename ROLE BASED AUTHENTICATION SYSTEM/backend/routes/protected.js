const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// ✅ Any authenticated user
router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: `Welcome ${req.user.role}`,
    userId: req.user.id,
  });
});

// 🔐 Only Judge
router.get('/judge', authenticate, authorizeRoles('Judge'), (req, res) => {
  res.json({
    message: `Hello Honorable Judge`,
    userId: req.user.id,
  });
});

// 🔐 Only Lawyer
router.get('/lawyer', authenticate, authorizeRoles('Lawyer'), (req, res) => {
  res.json({
    message: `Welcome Advocate`,
    userId: req.user.id,
  });
});

// 🔐 Only Law Student
router.get('/student', authenticate, authorizeRoles('Law Student'), (req, res) => {
  res.json({
    message: `Welcome Law Student`,
    userId: req.user.id,
  });
});

// 🔐 Only Litigants
router.get('/litigants', authenticate, authorizeRoles('Litigants'), (req, res) => {
  res.json({
    message: `Welcome Litigant`,
    userId: req.user.id,
  });
});

module.exports = router;
