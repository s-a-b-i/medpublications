// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './models/User.js';

// dotenv.config();

// // Connect to MongoDB
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };

// // Function to create admin
// const createAdmin = async () => {
//     try {
//         const existingAdmin = await User.findOne({ role: 'admin' });

//         if (existingAdmin) {
//             console.log('Admin user already exists');
//             process.exit(0);
//         }

//         const username = process.env.ADMIN_USERNAME || 'husnain';
//         const password = process.env.ADMIN_PASSWORD || 'husnA123';

//         // Don't hash here - let the model's pre('save') hook handle it
//         const adminUser = new User({
//             username,
//             password,  // Pass plain password, model will hash it
//             role: 'admin',
//         });

//         await adminUser.save();
//         console.log(`✓ Admin user created successfully`);
//         console.log(`  Username: ${username}`);
//         process.exit(0);
//     } catch (error) {
//         console.error('✗ Error creating admin user:', error.message);
//         process.exit(1);
//     }
// };

// // Run the functions
// (async () => {
//     await connectDB();
//     await createAdmin();
// })();