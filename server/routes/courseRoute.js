const express = require('express');
const { addCourse, getCourse, getAllCourse } = require('../controller/course');
const router = express.Router();
router.post('/addcourse',addCourse)
router.get('/course/:id',getCourse)
router.get('/',getAllCourse)
module.exports = router;