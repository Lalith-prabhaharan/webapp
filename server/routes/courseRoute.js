const express = require('express');
const { addCourse, getCourse, getAllCourse } = require('../controller/course');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();
router.post('/addcourse',adminMiddleware, addCourse)
router.get('/course/:id',getCourse)
router.get('/',getAllCourse)
module.exports = router;