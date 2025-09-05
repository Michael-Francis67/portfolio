// backend/middleware/rateLimit.js
import rateLimit from "express-rate-limit";

// Rate limiting for auth routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        message: "Too many login attempts, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiting for update operations
export const updateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per minute
    message: {
        message: "Too many update requests, please slow down",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
