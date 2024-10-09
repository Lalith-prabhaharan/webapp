const Discussion = require('../models/Discussions');

const createDiscussion = async (req, res) => {
  try {
    const { courseId, userId, topic, name, description } = req.body;
    const discussion = new Discussion({ courseId, userId, topic, name, description });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create discussion', error });
  }
};

const getDiscussionsByCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const discussions = await Discussion.find({ courseId })
      res.status(200).json(discussions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch discussions', error });
    }
  };
  
module.exports={
    getDiscussionsByCourse,createDiscussion
}