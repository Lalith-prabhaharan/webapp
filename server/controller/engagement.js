const Engagement = require('../models/Engagement'); // Assuming this is the path to your model
const User = require('../models/User')
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

const getUserEngagements = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from the route parameters

        // Find engagements for the specific user
        const engagement = await Engagement.findOne({ userId });

        if (!engagement) {
            return res.status(404).json({ message: 'No engagements found for this user' });
        }

        // Prepare data for the chart
        const engagementData = engagement.courseEngagements.map((courseEngagement) => ({
            courseId: courseEngagement.courseId,
            score: courseEngagement.score,
            timeSpent: courseEngagement.timeSpent,
        }));

        return res.status(200).json(engagementData);
    } catch (error) {
        console.error('Error fetching user engagements:', error);
        return res.status(500).json({ error: 'Failed to fetch user engagements' });
    }
};

const getCoursesEngagements = async (req, res) => {
    try {
        // Aggregate data to get total time spent and total score per course
        const engagementData = await Engagement.aggregate([
            { $unwind: "$courseEngagements" }, // Unwind the array to work with individual course engagements
            {
                $group: {
                    _id: "$courseEngagements.courseId", // Group by courseId
                    totalTimeSpent: { $sum: "$courseEngagements.timeSpent" }, // Sum the time spent
                    totalScore: { $sum: "$courseEngagements.score" }, // Sum the scores
                },
            },
            {
                $lookup: {
                    from: "courses", // Assuming your course model is stored in the "courses" collection
                    localField: "_id",
                    foreignField: "courseId",
                    as: "courseDetails",
                },
            },
            {
                $unwind: "$courseDetails", // Unwind to get the course name
            },
            {
                $project: {
                    courseId: "$_id",
                    courseName: "$courseDetails.name", // Assuming the course model has a name field
                    totalTimeSpent: 1,
                    totalScore: 1,
                },
            },
        ]);

        return res.status(200).json(engagementData);
    } catch (error) {
        console.error('Error fetching courses engagements:', error);
        return res.status(500).json({ error: 'Failed to fetch courses engagements' });
    }
};

const getCompletedCoursesByDepartment = async (req, res) => {
    try {
        const completedCoursesByDepartment = await Engagement.aggregate([
            { $unwind: "$courseEngagements" },
            {
                $lookup: {
                    from: "users",   // Assuming the users collection is named 'users'
                    localField: "userId",  
                    foreignField: "userId",  
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $group: {
                    _id: "$userDetails.department",  
                    completedCoursesCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    department: "$_id",  
                    completedCoursesCount: 1,
                    _id: 0  
                }
            }
        ]);

        return res.status(200).json(completedCoursesByDepartment);
    } catch (error) {
        console.error('Error fetching completed courses by department:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getUsersWithCompletedCourses = async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find({}, 'userId name department designation');
        
        // Fetch all engagements
        const engagements = await Engagement.find({});
        
        // Prepare result data by matching user data with their engagement
        const userData = users.map((user) => {
                const userEngagement = engagements.find((engagement) => engagement.userId === user.userId);
                const completedCourses = userEngagement ? userEngagement.courseEngagements.length : 0;  // Number of completed courses
                
            if(user.designation){
                return {
                    Name: user.name,
                    Designation: user.designation,
                    Department: user.department,
                    TotalTrainings: completedCourses
                };
            }
        });
        
        // Sort by the number of trainings (optional)
        userData.sort((a, b) => b.TotalTrainings - a.TotalTrainings);
        
        // Respond with user data and the total number of trainings completed
        return res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data with completed courses:', error);
        return res.status(500).json({ error: 'Failed to fetch user data with completed courses' });
    }
};

const fetchAllEngagements = async (req, res) => {
    try {
        const engagements = await Engagement.find(); // Fetch all engagements
        return res.status(200).json({ success: true, data: engagements });
    } catch (error) {
        console.error('Error fetching engagements:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { updateCourseEngagement,getUserEngagements ,
    getCoursesEngagements, getCompletedCoursesByDepartment,
    getUsersWithCompletedCourses, fetchAllEngagements };
