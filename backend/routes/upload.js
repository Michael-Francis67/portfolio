import express from "express";
import {updateLimiter} from "../middlewares/rate-limit.js";
import {protectRoute} from "../middlewares/auth.js";
import {generateSignature} from "../controllers/upload.js";

const router = express.Router();

router.get("/signature", protectRoute, updateLimiter, generateSignature);

export default router;
