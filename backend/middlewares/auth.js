const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 *  The Auth Checker middleware function.
 */
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // Get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // Very token, store decoded token and user into req
  try {
    const decoded = await jwt.verify(token, 'secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    req.token = decoded;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }

  return next();
};
