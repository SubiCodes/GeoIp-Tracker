import User from "../models/user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already has an account." });
        }

        // Create a unique userId
        const userId = uuidv4();

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const user = await User.create({ email, password: hashedPassword, userId });

        // Generate JWT
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '7d' }
        );

        // Set cookie (httpOnly, secure in production)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return user data excluding password
        return res.status(201).json({ success: true, message: "User created successfully", data: { email: user.email, userId: user.userId } });
    } catch (error) {
        console.error("Error in Signup", error);
        return res.status(500).json({ success: false, message: `Error Signing up: ${error}` });
    }
};