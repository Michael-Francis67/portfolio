import Project from "../models/Projects.js";

export const getProjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // Get projects with pagination
        const projects = await Project.find().populate("owner", "name").skip(skip).limit(limit).sort({createdAt: -1});

        // Get total count for pagination info
        const total = await Project.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({
            projects,
            pagination: {
                current: page,
                total: totalPages,
                count: projects.length,
                totalItems: total,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error getting projects"});
    }
};

export const createProject = async (req, res) => {
    try {
        const {title, description, link, imageUrl, imagePublicId} = req.body;

        if (!title || !description || !link || !imageUrl || !imagePublicId) {
            return res.status(400).json({message: "All fields are required"});
        }

        const project = new Project({title, description, link, imageUrl, imagePublicId, owner: req.user._id});
        await project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error creating project"});
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error updating project"});
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error deleting project"});
    }
};

export const getAProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("owner", "name");
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error getting project"});
    }
};
