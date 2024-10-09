// authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m'
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt for user:', username);
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user._id);

      // Set HTTP-only cookie
      res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      console.log('Login successful for user:', username);
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role
      });
    } else {
      console.log('Login failed for user:', username);
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  console.log('User logged out');
  res.json({ message: 'Logged out successfully' });
};
