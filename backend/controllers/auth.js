import {generateTokenAndSetCookie} from "../config/generateTokenAndSetCookie.js";
import User from "../models/User.js";

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;

        if (!user) return res.status(404).json({message: "User not found"});

        res.json(user);
    } catch (error) {
        console.log("Error getting user", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const signUp = async (req, res) => {
    try {
        const {username, password, name, title, bio} = req.body;

        if (!username || !password || !name || !title || !bio)
            return res.status(401).json({message: "All fields are required"});

        const userExists = await User.findOne({username});

        if (userExists) return res.status(400).json({message: "User already exists"});

        const newUser = new User({
            username,
            name,
            password,
            title,
            bio,
        });

        await newUser.save();

        await generateTokenAndSetCookie(newUser._id, res);

        res.json({
            username,
            name,
            title,
            bio,
        });
    } catch (error) {
        console.log("Error creating user", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) return res.status(401).json({message: "All fields are required"});

        const user = await User.findOne({username});

        if (!user) return res.status(404).json({message: "Invalid credentials"});

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({message: "Invalid credentials"});

        await generateTokenAndSetCookie(user._id, res);

        res.json({
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error login in user", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {expiresIn: ""});

        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error login out user", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) return res.status(404).json({message: "User not found"});

        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {new: true, runValidators: true}).select(
            "-password"
        );

        res.json({
            ...updatedUser._doc,
        });
    } catch (error) {
        console.log("Error updating profile of user", error);
        res.status(500).json({message: "Internal server error"});
    }
};
