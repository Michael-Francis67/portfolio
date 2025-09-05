import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        file: {
            type: Buffer,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const CV = mongoose.model("CV", cvSchema);

export default CV;
