import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateTokenAndSetCookie = async (id, res) => {
    try {
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
        });

        return token;
    } catch (error) {
        console.log("Error generating token", error);
    }
};
