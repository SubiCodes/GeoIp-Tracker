// scripts/seed.js or scripts/createUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // or bcryptjs
import dotenv from 'dotenv';

// Import your User model
import User from './models/user.model.js';

dotenv.config();

const generateUniqueUser = async () => {
  let username;
  let email;
  let exists = true;

  while (exists) {
    // Generate random 4-digit number
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Ensures 4 digits
    username = 'user';
    email = `seed.email.${randomNumbers}@gmail.com`;
    
    // Check if email exists in database
    const user = await User.findOne({ email });
    exists = !!user;
    
    if (exists) {
      console.log(`Email ${email} already exists, generating new one...`);
    }
  }

  return { username, email };
};

const seedUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Generate unique user data
    const { username, email } = await generateUniqueUser();

    // Hash the password
    const hashedPassword = await bcrypt.hash('dev12345', 10);

    // Create user
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

    console.log('✅ User created successfully!');
    console.log('==========================================');
    console.log(`Email: ${email}`);
    console.log('Password: dev12345');
    console.log('==========================================');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();