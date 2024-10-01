const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
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
  }
});


module.exports = mongoose.model('Progress', UserSchema);
