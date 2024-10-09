// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './models/User.js'; // Adjust the path to your User model
// import bcrypt from 'bcryptjs';

// dotenv.config();

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// // Function to create admin
// const createAdmin = async () => {
//   try {
//     const existingAdmin = await User.findOne({ role: 'admin' });

//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       process.exit();
//     }

//     const username = process.env.ADMIN_USERNAME || 'husnain';
//     const password = process.env.ADMIN_PASSWORD || 'husnA123';

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const adminUser = new User({
//       username,
//       password: hashedPassword,
//       role: 'admin',
//     });

//     await adminUser.save();
//     console.log(`Admin user created with username: ${username}`);
//     process.exit();
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//     process.exit(1);
//   }
// };

// // Run the functions
// (async () => {
//   await connectDB();
//   await createAdmin();
// })();
