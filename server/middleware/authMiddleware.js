// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    
    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user.role = user.role;  // Attach role to the request object
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
