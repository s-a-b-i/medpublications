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
    const user = await User.findOne({ username: username.trim() });

    if (user && (await user.matchPassword(password.trim()))) {
      const accessToken = generateToken(user._id);

      // Set HTTP-only cookie
      res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: true,      // Required for HTTPS on Render
        sameSite: 'none',   // 'none' is often required for cross-site cookies on mobile browsers
        path: '/',         // Ensure cookie is available on all paths
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      console.log('Login successful for user:', user.username);
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
