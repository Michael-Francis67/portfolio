import express from "express";
import {protectRoute} from "../middlewares/auth.js";
import {getProjects, createProject, updateProject, deleteProject, getAProject} from "../controllers/projects.js";
import {updateLimiter} from "../middlewares/rate-limit.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", protectRoute, updateLimiter, getAProject);
router.post("/", protectRoute, updateLimiter, createProject);
router.put("/:id", protectRoute, updateLimiter, updateProject);
router.delete("/:id", protectRoute, updateLimiter, deleteProject);

export default router;
