// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { createQuiz,getQuizByCourseId,evaluateQuiz } = require('../controller/quiz.js');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware.js');


// Create a new quiz
router.post('/',adminMiddleware, createQuiz);

// Get quiz by course ID
router.get('/:courseId',getQuizByCourseId);
router.post('/submit', evaluateQuiz);

module.exports = router;
