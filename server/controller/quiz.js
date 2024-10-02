// controllers/quizController.js
const Quiz = require('../models/Quiz');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        console.log(quiz)
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

const evaluateQuiz = async (req, res) => {
    try {
        const { courseId, submittedAnswers } = req.body;

        // Fetch the quiz from the database using courseId
        const quiz = await Quiz.findOne({ courseId });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Initialize score
        let score = 0;

        // Loop through each question and check if the submitted answer matches the correct answer
        quiz.questions.forEach((question, index) => {
            const submittedAnswer = submittedAnswers[index];
            if (submittedAnswer === question.answer) {
                score += 1; // Increase score for correct answer
            }
        });

        // Return the score to the client
        return res.status(200).json({ score, totalQuestions: quiz.questions.length });

    } catch (error) {
        console.error('Error evaluating quiz:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    createQuiz, getQuizByCourseId, evaluateQuiz
}