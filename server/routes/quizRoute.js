// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { createQuiz,getQuizByCourseId } = require('../controller/quiz.js');


// Create a new quiz
router.post('/', createQuiz);

// Get quiz by course ID
router.get('/:courseId',getQuizByCourseId);

module.exports = router;
