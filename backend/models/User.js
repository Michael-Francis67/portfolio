// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        bio: {
            type: String,
            maxlength: 500,
        },
        profilePic: {
            type: String,
            default: "",
        },
        publicId: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(12);
        // Hash the password along with the new salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Pre-save hook for case-insensitive username handling
userSchema.pre("save", function (next) {
    if (this.isModified("username")) {
        this.username = this.username.toLowerCase();
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if password needs rehashing (if algorithm changes)
userSchema.methods.passwordNeedsRehash = function () {
    // Check if password was hashed with different algorithm or rounds
    return !this.password.startsWith("$2a$12$") && !this.password.startsWith("$2b$12$");
};

const User = mongoose.model("User", userSchema);

export default User;
