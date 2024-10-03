const express = require('express');
const { registerUser, loginUser, getCurrentUser,getAllUsers, deleteUser, updateUser } = require('../controller/auth.js');
const { authenticate } = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// User registration route
router.post('/register',adminMiddleware, registerUser);

// User login route
router.post('/login', loginUser);

router.get('/all',adminMiddleware, getAllUsers);

router.delete('/user/:id',adminMiddleware,deleteUser);

router.patch('/user/:id',adminMiddleware,updateUser);

module.exports = router;
