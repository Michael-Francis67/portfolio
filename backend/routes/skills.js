import express from "express";
import {createSkill, deleteSkill, getAdminSkills, getAllSkills} from "../controllers/skills.js";
import {protectRoute} from "../middlewares/auth.js";
import {updateLimiter} from "../middlewares/rate-limit.js";

const router = express.Router();

router.get("/", getAllSkills);
router.get("/admin", protectRoute, getAdminSkills);
router.post("/", protectRoute, updateLimiter, createSkill);
router.delete("/:id", protectRoute, updateLimiter, deleteSkill);

export default router;
