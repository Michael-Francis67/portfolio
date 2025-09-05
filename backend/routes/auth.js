import express from "express";
import {protectRoute} from "../middlewares/auth.js";
import {authLimiter} from "../middlewares/rate-limit.js";
import {checkAuth, login, logout, signUp, updateProfile} from "../controllers/auth.js";

const router = express.Router();

router.get("/me", protectRoute, checkAuth);
router.post("/signup", authLimiter, signUp);
router.post("/login", authLimiter, login);
router.post("/logout", authLimiter, protectRoute, logout);
router.put("/profile", authLimiter, protectRoute, updateProfile);

export default router;
