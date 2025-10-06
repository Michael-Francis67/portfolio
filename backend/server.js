import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import skillRoutes from "./routes/skills.js";
import projectRoutes from "./routes/projects.js";
import uploadRoutes from "./routes/upload.js";
import CVRoutes from "./routes/cv.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(helmet({contentSecurityPolicy: false}));

if (process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
        })
    );
}

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Something went wrong!"});
});

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cv", CVRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database
});

/*This is an ecommerce store where users buy products and all being managed by an admin */
