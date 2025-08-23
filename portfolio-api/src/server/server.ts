import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "../config/db";
import helmet from "helmet";

import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";
import aiDevPortfolioAssistantRoutes from "../modules/ai-devportfolio-assistant/aiDevPortfolioAssistant.routes";

dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", "config.env"),
});

console.log(
  "✅ OPENAI_API_KEY loaded:",
  process.env.OPENAI_API_KEY ? "YES" : "NO"
);

const PORT = process.env.PORT || 3010;

connectDB();

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = (process.env.CORS_ORIGIN ?? "").split(",");
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Body parsers ANTES de las rutas
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Rutas
app.use("/api", homeRoutes);
app.use("/api", aiDevPortfolioAssistantRoutes);
app.use("/api", aboutRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
