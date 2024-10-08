const express = require('express');
const router = express.Router();
const {createDiscussion,getDiscussionsByCourse  } = require('../controller/discussions.js');

router.post('/',createDiscussion)
router.get('/:courseId',getDiscussionsByCourse)

module.exports = router;