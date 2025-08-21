import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "../config/db";

import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";
import aiDevPortfolioAssistantRoutes from "../modules/ai-devportfolio-assistant/aiDevPortfolioAssistant.routes";

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 3010;

connectDB();

const app = express();

// ✅ SOLO un cors() y configurado (si usas credenciales, evita '*' como origin)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Body parsers ANTES de las rutas
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", homeRoutes);
app.use("/api", aiDevPortfolioAssistantRoutes);
app.use("/api", aboutRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
