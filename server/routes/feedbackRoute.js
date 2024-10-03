const express = require('express');
const { addFeedback, fetchFeedbackByCourseId, getFeedbackByCourseAndUser } = require('../controller/feedback');
const router = express.Router();

router.post('/add', addFeedback);
router.get('/',fetchFeedbackByCourseId)
router.get('/check',getFeedbackByCourseAndUser)

module.exports = router;
