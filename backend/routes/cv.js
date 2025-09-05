import express from "express";
import multer from "multer";
import {getCV, updateCV, uploadCV} from "../controllers/cv.js";
import {protectRoute} from "../middlewares/auth.js";
import {updateLimiter} from "../middlewares/rate-limit.js";

const router = express.Router();

// Store file in memory as Buffer
const storage = multer.memoryStorage();
const upload = multer({storage});

router.get("/", getCV);
router.post("/upload", protectRoute, updateLimiter, upload.single("file"), uploadCV);
router.put("/update", protectRoute, updateLimiter, upload.single("file"), updateCV);

export default router;
