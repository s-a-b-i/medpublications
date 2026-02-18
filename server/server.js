import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

dotenv.config();

const app = express();
const _dirname = path.resolve();

// ADD THIS LINE - Critical for Render/Heroku/Vercel
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Update CORS to allow your Render domain
const allowedOrigins = [
  'http://localhost:5173',
  'https://medpublications.onrender.com', // Primary domain
  'https://medpublications.onrender.com/' // With trailing slash
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        frameSrc: ["'self'", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "https://api.cloudinary.com", ...allowedOrigins],
      },
    },
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Static files for deployment
app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, '/client/dist/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth.js';
// import protectedRoutes from './routes/protected.js';
// import path from 'path';

// dotenv.config();

// const app = express();

// const _dirname = path.resolve();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors({
//   origin:  'http://localhost:5173',
//   credentials: true
// }));


// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],  // For inline styles
//         styleSrcElem: ["'self'", "https://fonts.googleapis.com"],  // Specifically for external stylesheets
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],  // For external font files
//         frameSrc: ["'self'", "https://res.cloudinary.com"],
//         connectSrc: ["'self'", "https://api.cloudinary.com"],  // Allow Cloudinary API calls
//       },
//     },
//   })
// );



// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/protected', protectedRoutes);


// app.use(express.static(path.join(_dirname, '/client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(_dirname, '/client/dist/index.html'));
// })

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));