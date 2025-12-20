import User from "../models/user.model";

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User has an existing account." });
        };
        const newUser = new User({ email, password });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.error("Error in Signin", error);
        return res.status(500).json({ success: false, message: `Error Signing in: ${error}` });
    };
};