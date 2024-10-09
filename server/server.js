import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import path from 'path';

dotenv.config();

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:  'http://localhost:5173',
  credentials: true
}));


app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],  // For inline styles
        styleSrcElem: ["'self'", "https://fonts.googleapis.com"],  // Specifically for external stylesheets
        fontSrc: ["'self'", "https://fonts.gstatic.com"],  // For external font files
        frameSrc: ["'self'", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "https://api.cloudinary.com"],  // Allow Cloudinary API calls
      },
    },
  })
);



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);


app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, '/client/dist/index.html'));
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));