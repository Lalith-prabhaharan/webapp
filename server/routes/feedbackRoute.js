const express = require('express');
const { addFeedback } = require('../controller/feedback');
const router = express.Router();

router.post('/add', addFeedback);

module.exports = router;
