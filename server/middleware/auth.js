import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('Token verified, user:', req.user.username);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Admin access granted for user:', req.user.username);
    next();
  } else {
    console.log('Admin access denied for user:', req.user ? req.user.username : 'unknown');
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
