const express = require('express');
const { updateCourseEngagement } = require('../controller/engagement');
const router = express.Router();

router.post("/",updateCourseEngagement)
module.exports = router;