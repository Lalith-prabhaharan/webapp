const express = require('express');
const { registerUser, loginUser, getCurrentUser,getAllUsers, deleteUser, updateUser } = require('../controller/auth.js');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

router.get('/all', getAllUsers);

router.delete('/user/:id',deleteUser);

router.patch('/user/:id',updateUser);

module.exports = router;
