import crypto from "crypto";
import "dotenv/config";

export const generateSignature = (req, res) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = crypto
        .createHash("sha1")
        .update(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
        .digest("hex");

        res.json({
            timestamp,
            signature,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    } catch (error) {
        console.error("Error generating signature:", error);
        res.status(500).json({message: "Error generating upload signature"});
    }
};
