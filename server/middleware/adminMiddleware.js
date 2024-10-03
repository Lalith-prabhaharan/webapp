// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        
      const user = await User.findOne({ _id: decoded.id, role: decoded.role });
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
      next();
    } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = adminMiddleware;
// 