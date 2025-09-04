import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "../config/db";

import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";
import projectsRoutes from "../modules/projects/projects.routes";
import aiDevPortfolioAssistantRoutes from "../modules/ai-devportfolio-assistant/aiDevPortfolioAssistant.routes";

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 3010;

connectDB();

const app = express();

app.use("/images", express.static(path.join(__dirname, "../../public/images")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", homeRoutes);
app.use("/api", aiDevPortfolioAssistantRoutes);
app.use("/api", aboutRoutes);
app.use("/api", projectsRoutes);

// Test endpoint
app.get("/api/test", (_req: Request, res: Response) => {
  res.json({ message: "Test endpoint working!" });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
