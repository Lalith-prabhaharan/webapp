// controllers/quizController.js
const Quiz = require('../models/Quiz');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get quiz by course ID
const getQuizByCourseId = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ courseId: req.params.courseId });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createQuiz,getQuizByCourseId
}