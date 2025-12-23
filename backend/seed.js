import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Install: npm install uuid

import User from './models/user.model.js';

dotenv.config();

const generateUniqueUser = async () => {
  let userName;
  let userId;
  let email;
  let exists = true;

  while (exists) {
    // Generate random 4-digit number
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    userName = 'user';
    userId = uuidv4(); // Generate unique userId
    email = `seed.email.${randomNumbers}@gmail.com`;
    
    // Check if email exists in database
    const user = await User.findOne({ email });
    exists = !!user;
    
    if (exists) {
      console.log(`Email ${email} already exists, generating new one...`);
    }
  }

  return { userName, userId, email };
};

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const { userName, userId, email } = await generateUniqueUser();
    const hashedPassword = await bcrypt.hash('dev12345', 10);

    const user = await User.create({
      userId: userId,
      userName: userName,
      email: email,
      password: hashedPassword
    });

    console.log('✅ User created successfully!');
    console.log('==========================================');
    console.log(`Email: ${email}`);
    console.log(`Username: ${userName}`);
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