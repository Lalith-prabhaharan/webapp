const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controller/auth.js');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Route to get current user (for dashboard access)
// router.get('/me', authenticate, getCurrentUser);

module.exports = router;
