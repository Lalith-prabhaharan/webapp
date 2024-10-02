const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { 
        type: Number, 
        ref: 'User', 
        required: true 
    }, // Reference to the employee giving feedback
    courseId: { 
        type: Number,
        ref: 'Course',
        required: true 
    }, // Reference to the course being reviewed
    rating: { 
        type: Number, 
        required: true, 
        min: 1, max: 5 
    }, // Rating from 1 to 5 stars
    difficulty: {
        type: String,
        required : true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    comments: { 
        type: String, 
        required: false ,
        maxlength: 500
    }, // Optional comments from the employee
    interactive: {
        type: String, 
        enum : ['Yes','No']
    },
    submittedAt: { 
        type: Date, 
        default: Date.now 
    }, // Date when feedback was submitted
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
