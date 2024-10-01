const express = require('express');
const { addCourse, getCourse } = require('../controller/course');
const router = express.Router();
router.post('/addcourse',addCourse)
router.get('/course/:id',getCourse)
module.exports = router;