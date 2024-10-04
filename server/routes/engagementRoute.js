const express = require('express');
const { updateCourseEngagement, getUserEngagements, getCoursesEngagements, getCompletedCoursesByDepartment, getUsersWithCompletedCourses, fetchAllEngagements } = require('../controller/engagement');
const router = express.Router();

router.post("/",updateCourseEngagement)
router.get("/get/:userId",getUserEngagements)
router.get("/course",getCoursesEngagements)
router.get("/department",getCompletedCoursesByDepartment)
router.get("/users",getUsersWithCompletedCourses)
router.get("/all",fetchAllEngagements)
module.exports = router;