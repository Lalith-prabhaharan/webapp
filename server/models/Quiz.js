// models/Quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            options: {
                type: [String], // Array of options for the question
                required: true,
            },
            answer: {
                type: String,
                required: true, // The correct answer
            },
        },
    ],
});

module.exports = mongoose.model('Quiz', QuizSchema);
