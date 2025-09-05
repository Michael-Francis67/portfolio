// backend/models/Skill.js
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure unique skill names per user
skillSchema.index({name: 1, owner: 1}, {unique: true});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
