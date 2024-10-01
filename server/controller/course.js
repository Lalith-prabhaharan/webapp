const Course = require('../models/Course');

// Route to create a new course (Admin)

const addCourse= async (req, res) => {
  try {
    const { courseId, name, est_duration, postedby, stack, prerequisites, blogContent, videoUrls } = req.body;

    const course = new Course({
      courseId,
      name,
      est_duration,
      postedby,
      stack,
      prerequisites,
      blogContent,
      videoUrls
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Route to get course by id (For Employees)

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find({});
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    addCourse , getCourse, getAllCourse
};
