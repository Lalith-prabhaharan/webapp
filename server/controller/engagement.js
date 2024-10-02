const Engagement = require('../models/Engagement'); // Assuming this is the path to your model

const updateCourseEngagement = async (req, res) => {
    try {
        const { userId, courseEngagements } = req.body;
        const { courseId, score, timeSpent } = courseEngagements[0]; // Accessing the first engagement details

        // Check if the engagement already exists for this user
        let engagement = await Engagement.findOne({ userId });

        if (engagement) {
            // Check if this course engagement already exists
            const courseIndex = engagement.courseEngagements.findIndex(
                (engagement) => engagement.courseId.toString() === courseId
            );

            if (courseIndex > -1) {
                // If course engagement exists, update the score and timeSpent
                engagement.courseEngagements[courseIndex].score = score;
                engagement.courseEngagements[courseIndex].timeSpent = timeSpent;
            } else {
                // If the course doesn't exist, append the new engagement
                engagement.courseEngagements.push({
                    courseId,
                    score,
                    timeSpent,
                });
            }
        } else {
            // If user doesn't have any engagements, create a new one
            engagement = new Engagement({
                userId,
                courseEngagements: [
                    {
                        courseId,
                        score,
                        timeSpent,
                    },
                ],
            });
        }

        // Save the updated/new engagement
        console.log(engagement);
        await engagement.save();

        return res.status(200).json({ message: 'Engagement updated successfully', engagement });
    } catch (error) {
        console.error('Error updating course engagement:', error);
        return res.status(500).json({ error: 'Failed to update course engagement' });
    }
};

module.exports = { updateCourseEngagement };
