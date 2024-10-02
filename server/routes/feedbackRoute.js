const express = require('express');
const { addFeedback, fetchFeedbackByCourseId } = require('../controller/feedback');
const router = express.Router();

router.post('/add', addFeedback);
router.get('/',fetchFeedbackByCourseId)

module.exports = router;
