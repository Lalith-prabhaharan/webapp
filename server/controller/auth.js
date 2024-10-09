// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
const registerUser = async (req, res) => {
    const {userId, name, email, password, role, department, designation, createdAt } = req.body;
    try {
      if (!userId || !name || !email || !password || !department || !designation) {
        return res.status(400).json({ msg: 'All fields are required' });
        }

        // Validate email format (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg:'Invalid email' });
        }

        // Check if the user already exists
        let user = await User.findOne({ userId });
        if (user) {
            return res.status(400).json({ msg: 'Employee exists' });
        }
        
        // Create a new user
        user = new User({
            userId,
            name,
            email,
            password:await bcrypt.hash(password, 10), // Hash the password
            role: role || 'user', // Default role is 'user'
            department,// Include department
            designation,
            createdAt
        });
        console.log(user);
        
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token and user data
        res.status(201).json({ token, user: { id: user.userId, email: user.email, name:user.name, role: user.role, department: user.department, designation: user.designation } });

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
      return res.status(400).json({ msg: 'Invalid credentials1' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user data
    res.json({ token, user: { id: user._id, email: user.email, name:user.name, role: user.role, userId: user.userId, department: user.department, designation: user.designation } });

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

const getAllUsers = async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await User.find({role:'user'});

      // If no users found, send a message
      if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No users found' });
      }

      // Return the users in the response
      return res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Server error. Could not retrieve users.' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
      // Find and delete the user by ID
      const user = await User.findOneAndDelete({userId:id})

      // If no user is found, return a 404 error
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Server error. Could not delete user.' });
  }
};

//Update User
const updateUser=async(req,res)=>{
  const {id}=req.params;
  console.log(id)
  const updatedData=req.body
  try{
      const updatedUser= await User.findOneAndUpdate({userId:id},
          updatedData,        
          { new: true }
      )
      if(!updatedUser){
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({msg:"Updated Sucessfully",updatedUser}); 
  }
  catch(err){
      res.status(500).json({ message: err.message });
  }
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
    deleteUser,
    updateUser
  };