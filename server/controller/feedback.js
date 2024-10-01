const Feedback = require('../models/Feedback');

// Add Feedback for a course
const addFeedback = async (req, res) => {
    const { userId, courseId, rating, comments, difficulty, interactive } = req.body;

    try {
        // Validate required fields
        if (!userId || !courseId || !rating) {
            return res.status(400).json({ message: 'User ID, Course ID, and rating are required.' });
        }

        // Create new feedback
        const newFeedback = new Feedback({
            userId,
            courseId,
            rating,
            comments,
            difficulty, 
            interactive
        });

        // Save the feedback to the database
        await newFeedback.save();

        return res.status(201).json({ message: 'Feedback added successfully.', feedback: newFeedback });
    } catch (error) {
        console.error('Error adding feedback:', error);
        return res.status(500).json({ message: 'Server error. Could not add feedback.' });
    }
};

module.exports = { addFeedback };
