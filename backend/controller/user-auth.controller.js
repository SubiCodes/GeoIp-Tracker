import User from "../models/user.model";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already has an account." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const user = await User.create({ email, password: hashedPassword, userId: email });

        // Return user data excluding password
        return res.status(201).json({ success: true, message: "User created successfully", data: { email: user.email, userId: user.userId } });
    } catch (error) {
        console.error("Error in Signin", error);
        return res.status(500).json({ success: false, message: `Error Signing in: ${error}` });
    };
};