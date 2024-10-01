const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userId: { 
    type: Number,
    unique: true 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  department: {
    type: String,
    required: true 
  },
  designation: {
    type: String,
    required: true 
  },
  createdAt:{
    type: Date
  }
});


module.exports = mongoose.model('User', UserSchema);
