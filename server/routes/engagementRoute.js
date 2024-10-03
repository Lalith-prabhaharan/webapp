const express = require('express');
const { updateCourseEngagement, getUserEngagements } = require('../controller/engagement');
const router = express.Router();

router.post("/",updateCourseEngagement)
router.get("/get/:userId",getUserEngagements)
module.exports = router;