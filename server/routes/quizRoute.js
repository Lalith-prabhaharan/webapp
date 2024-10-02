// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { createQuiz,getQuizByCourseId,evaluateQuiz } = require('../controller/quiz.js');


// Create a new quiz
router.post('/', createQuiz);

// Get quiz by course ID
router.get('/:courseId',getQuizByCourseId);
router.post('/submit', evaluateQuiz);

module.exports = router;
