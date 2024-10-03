const Feedback = require('../models/Feedback'); // Adjust the path as necessary

// Add Feedback
const addFeedback = async (req, res) => {
    try {
        const { userId, courseId, rating, difficulty, comments, interactive } = req.body;

        const newFeedback = new Feedback({
            userId,
            courseId,
            rating,
            difficulty,
            comments,
            interactive,
        });

        const savedFeedback = await newFeedback.save();

        return res.status(201).json({ message: 'Feedback added successfully', feedback: savedFeedback });
    } catch (error) {
        console.error('Error adding feedback:', error);
        return res.status(500).json({ error: 'Failed to add feedback' });
    }
};

// Fetch Feedback based on Course ID
const fetchFeedbackByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log("cours",courseId)
        const feedbackList = await Feedback.find({ courseId }).populate('userId', 'name'); // Populate userId with name

        if (feedbackList.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this course' });
        }

        return res.status(200).json(feedbackList);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};
// Fetch feedback by courseId and userId
const getFeedbackByCourseAndUser = async (req, res) => {
    try {
        const { courseId, userId } = req.query;

        // Find feedback entry for the specified course and user
        const feedback = await Feedback.findOne({ courseId, userId });

        if (!feedback) {
            return res.status(404).json({ message: 'No feedback found for this course and user' });
        }

        return res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching feedback for course and user:', error);
        return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};

module.exports = {
    addFeedback,
    fetchFeedbackByCourseId,
    getFeedbackByCourseAndUser
};
