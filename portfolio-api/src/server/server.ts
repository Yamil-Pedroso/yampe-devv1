import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "../config/db";
import helmet from "helmet";

import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";
import projectsRoutes from "../modules/projects/projects.routes";
import aiDevPortfolioAssistantRoutes from "../modules/ai-devportfolio-assistant/aiDevPortfolioAssistant.routes";
import notificationRoutes from "../modules/notifications/notifications.routes";
import notificationsAdminFormRoutes from "../routes/notificationAdminForm";

dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", "config.env"),
});

console.log(
  "✅ OPENAI_API_KEY loaded:",
  process.env.OPENAI_API_KEY ? "YES" : "NO",
);

const PORT = process.env.PORT || 3010;

connectDB();

const app = express();

// ------------------ STATIC FILES ------------------
const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
console.log("Serving images from:", IMAGES_DIR);
app.use("/images", express.static(IMAGES_DIR));

// ------------------ SECURITY ------------------
app.use(helmet());

// ------------------ CORS ------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3010",
      "https://yampe.dev",
      "https://yampe-devv1.vercel.app",
    ],
    credentials: true,
  }),
);

// ------------------ BODY PARSERS ------------------
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// ------------------ API ROUTES ------------------
app.use("/api", homeRoutes);
app.use("/api", aiDevPortfolioAssistantRoutes);
app.use("/api", aboutRoutes);
app.use("/api", projectsRoutes);
app.use("/api", notificationRoutes);

// ------------------ ADMIN FORM ROUTES ------------------
app.use("/admin", notificationsAdminFormRoutes);

// ------------------ ROOT ROUTES ------------------
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// ------------------ ERROR HANDLER ------------------
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
