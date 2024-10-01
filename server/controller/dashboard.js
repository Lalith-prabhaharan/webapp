// routes/dashboard.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin dashboard route (only accessible by admins)
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

// User dashboard route (only accessible by users)
router.get('/user', authMiddleware, roleMiddleware('user'), (req, res) => {
  res.json({ msg: 'Welcome to the user dashboard' });
});

module.exports = router;
