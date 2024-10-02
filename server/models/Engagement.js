const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
    userId: {
        type: Number,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    courseEngagements: [
        {
            courseId: {
                type: Number,
                ref: 'Course', // Assuming you have a Course model
                required: true,
            },
            score: {
                type: Number, // Store the quiz score for the course
                required: true,
                default: 0,  // Default score is 0
            },
            timeSpent: {
                type: Number, // Store time spent on the course in minutes (or seconds based on preference)
                required: true,
                default: 0, // Default is no time spent
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Engagement', EngagementSchema);
