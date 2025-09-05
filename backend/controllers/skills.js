import Skill from "../models/Skills.js";

export const getAllSkills = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // Get skills with pagination
        const skills = await Skill.find().populate("owner", "name").skip(skip).limit(limit).sort({createdAt: -1});

        // Get total count for pagination info
        const total = await Skill.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({
            skills,
            pagination: {
                current: page,
                total: totalPages,
                count: skills.length,
                totalItems: total,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.log("Error getting all skills", error);
        res.status(500).json({message: "Error getting skills", error: error});
    }
};

export const getAdminSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({createdAt: -1});

        res.json(skills);
    } catch (error) {
        console.log("Error getting all skills", error);
        res.status(500).json({message: "Error getting skills", error: error});
    }
};

export const createSkill = async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) return res.status(401).json({message: "Skill name is required"});

        const newSkill = new Skill({
            name,
            owner: req.user._id,
        });

        await newSkill.save();
        res.json(newSkill);
    } catch (error) {
        console.log("Error creating skill", error);
        res.status(500).json({message: "Error creating skill", error: error});
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        res.json(skill);
    } catch (error) {
        console.log("Error deleting skill", error);
        res.status(500).json({message: "Error deleting skill", error: error});
    }
};
