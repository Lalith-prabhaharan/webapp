// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
const registerUser = async (req, res) => {
    const {name, email, password, role, department } = req.body;
    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ msg: 'User already exists' });
        }
        
        // Create a new user
        user = new User({
            name,
            email,
            password:await bcrypt.hash(password, 10), // Hash the password
            role: role || 'user', // Default role is 'user'
            department // Include department
        });
        console.log(user);
        
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token and user data
        res.status(201).json({ token, user: { id: user.userId, email: user.email, role: user.role, department: user.department } });

    } 
    catch (error) {
        res.status(500).send('Server error');
    }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user data
    res.json({ token, user: { id: user._id, email: user.email, role: user.role, userId: user.userId, department: user.department } });

  } catch (error) {
    res.status(500).send('Server error');
  }
};

const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
  };