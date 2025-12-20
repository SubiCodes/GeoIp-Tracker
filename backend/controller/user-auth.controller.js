import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid email",
                suggestion: "Please enter a valid email address."
            }
        });
    }
    // Password validation: alphanumeric, 8+ chars, no special symbols or spaces
    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid password",
                suggestion: "Password must be at least 8 characters, alphanumeric, and contain no spaces or special symbols."
            }
        });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: {
                    title: "Registration failed",
                    suggestion: "User already has an account. Please sign in or use a different email."
                }
            });
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

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.FRONTEND_URI || 'localhost',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Return user data excluding password
        return res.status(201).json({
            success: true,
            message: {
                title: "Registration successful",
                suggestion: "Your account has been created. Welcome!"
            },
            data: { email: user.email, userId: user.userId }
        });
    } catch (error) {
        console.error("Error in Signup", error);
        return res.status(500).json({
            success: false,
            message: {
                title: "Server error",
                suggestion: "Something went wrong. Please try again later."
            }
        });
    };
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Login failed",
                    suggestion: "Wrong email or password. Please try again."
                }
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Login failed",
                    suggestion: "Wrong email or password. Please try again."
                }
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '7d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.FRONTEND_URI || 'localhost',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: {
                title: "Login successful",
                suggestion: "Welcome back!"
            },
            data: { email: user.email, userId: user.userId }
        });
    } catch (error) {
        console.error("Error in Signin", error);
        return res.status(500).json({
            success: false,
            message: {
                title: "Server error",
                suggestion: "Something went wrong. Please try again later."
            }
        });
    }
};

export const validateUserCookie = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Authentication failed",
                    suggestion: "No authentication token found. Please sign in."
                }
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        // Check if user still exists in DB
        const user = await User.findOne({ userId: decoded.userId });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Authentication failed",
                    suggestion: "User does not exist. Please sign in again."
                }
            });
        }
        return res.status(200).json({
            success: true,
            message: {
                title: "Token valid",
                suggestion: "User is authenticated."
            },
            data: decoded
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: {
                title: "Authentication failed",
                suggestion: "Invalid or expired token. Please sign in again."
            }
        });
    }
};

export const signOut = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.FRONTEND_URI || 'localhost',
        });
        return res.status(200).json({
            success: true,
            message: {
                title: "Signed out",
                suggestion: "You have been signed out successfully."
            }
        });
    } catch (error) {
        console.error("Error in Signout", error);
        return res.status(500).json({
            success: false,
            message: {
                title: "Signout failed",
                suggestion: "Something went wrong while signing out. Please try again."
            }
        });
    }
};