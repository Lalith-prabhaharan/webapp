const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseId: { 
    type: Number,
    unique: true 
  },
  name: {
    type: String,
    required: true,
  },
  est_duration: {
    type: String,
    required: true,
    unique:false
  },
  postedby: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    enum: ['fullstack', 'data engineering', 'data science', 'gen AI'],
  },
  prerequisites: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String, // To store the blog written by the admin
    required: true,
  },
  videoUrls: [{
    type: String, // Array to store video URLs
    required: false,
  }]
});


module.exports = mongoose.model('Course', CourseSchema);
